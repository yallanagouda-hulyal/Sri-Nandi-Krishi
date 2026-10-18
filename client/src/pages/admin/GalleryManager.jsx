import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Plus, Trash2, Edit2 } from 'lucide-react';
import { galleryService } from '../../services/api';

export default function GalleryManager({ showToast }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingImage, setEditingImage] = useState(null);
  const [isNew, setIsNew] = useState(false);

  const [form, setForm] = useState({
    title: '',
    category: 'Sugarcane',
    imageUrl: '',
    caption: '',
    order: 0
  });

  const loadGallery = async () => {
    setLoading(true);
    try {
      const data = await galleryService.getAll();
      setImages(data || []);
    } catch (err) {
      showToast('Failed to load gallery images.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const handleOpenEdit = (img) => {
    setIsNew(false);
    setEditingImage(img);
    setForm({
      title: img.title || '',
      category: img.category || 'Sugarcane',
      imageUrl: img.imageUrl || '',
      caption: img.caption || '',
      order: img.order || 0
    });
  };

  const handleOpenCreate = () => {
    setIsNew(true);
    setEditingImage(true);
    setForm({
      title: '',
      category: 'Sugarcane',
      imageUrl: '/images/sugarcane-field.jpg',
      caption: '',
      order: images.length + 1
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (isNew) {
        await galleryService.create(form);
        showToast('Gallery image added successfully!', 'success');
      } else {
        await galleryService.update(editingImage._id, form);
        showToast('Gallery image updated!', 'success');
      }
      setEditingImage(null);
      loadGallery();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to save gallery image.', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this gallery photograph?')) return;
    try {
      await galleryService.delete(id);
      showToast('Gallery image deleted.', 'success');
      loadGallery();
    } catch (err) {
      showToast('Failed to delete image.', 'error');
    }
  };

  return (
    <div>
      <div className="admin-panel-card">
        <div className="admin-panel-header">
          <div>
            <h3>Gallery Management</h3>
            <p>Add and curate high-resolution photographs of farm crops and field operations</p>
          </div>

          <button
            className="btn btn-primary"
            style={{ padding: '8px 18px', fontSize: '13px' }}
            onClick={handleOpenCreate}
          >
            <Plus size={16} />
            <span>Add Photograph</span>
          </button>
        </div>

        <div className="admin-table-responsive">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Preview</th>
                <th>Title</th>
                <th>Category</th>
                <th>Caption</th>
                <th>Order</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '30px' }}>Loading gallery...</td>
                </tr>
              ) : images.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '30px' }}>No photographs found.</td>
                </tr>
              ) : (
                images.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        style={{ width: '60px', height: '42px', objectFit: 'cover', borderRadius: '4px' }}
                      />
                    </td>
                    <td><b>{item.title}</b></td>
                    <td>
                      <span className="badge-status Confirmed" style={{ fontSize: '11px' }}>
                        {item.category}
                      </span>
                    </td>
                    <td style={{ maxWidth: '280px', fontSize: '12px' }}>{item.caption || '—'}</td>
                    <td>{item.order || 0}</td>
                    <td>
                      <div className="action-btn-group">
                        <button
                          className="btn-action-icon"
                          title="Edit"
                          onClick={() => handleOpenEdit(item)}
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          className="btn-action-icon danger"
                          title="Delete"
                          onClick={() => handleDelete(item._id)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingImage && (
        <div className="admin-modal-backdrop" onClick={() => setEditingImage(null)}>
          <div className="admin-modal-window" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{isNew ? 'Add Gallery Photograph' : 'Edit Photograph'}</h3>
              <button className="admin-modal-close" onClick={() => setEditingImage(null)}>✕</button>
            </div>

            <form onSubmit={handleSave}>
              <div className="admin-form-group">
                <label className="admin-form-label">Title</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="admin-form-input"
                  placeholder="e.g. Sugarcane Row Furrows"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="admin-form-group">
                  <label className="admin-form-label">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="admin-form-select"
                  >
                    <option value="Sugarcane">Sugarcane</option>
                    <option value="Banana">Banana</option>
                    <option value="Papaya">Papaya</option>
                    <option value="Watermelon">Watermelon</option>
                    <option value="Field Work">Field Work</option>
                  </select>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Order</label>
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                    className="admin-form-input"
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Image Path / URL</label>
                <input
                  type="text"
                  required
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  className="admin-form-input"
                  placeholder="/images/sugarcane-field.jpg"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Caption / Description</label>
                <textarea
                  rows="2"
                  value={form.caption}
                  onChange={(e) => setForm({ ...form, caption: e.target.value })}
                  className="admin-form-textarea"
                  placeholder="Short note about the field operation..."
                />
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="btn btn-outline"
                  style={{ padding: '8px 16px', fontSize: '13px' }}
                  onClick={() => setEditingImage(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ padding: '8px 18px', fontSize: '13px' }}
                >
                  Save Image
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
