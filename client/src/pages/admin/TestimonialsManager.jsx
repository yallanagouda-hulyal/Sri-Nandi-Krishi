import React, { useState, useEffect } from 'react';
import { Star, Plus, Edit2, Trash2 } from 'lucide-react';
import { testimonialService } from '../../services/api';

export default function TestimonialsManager({ showToast }) {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [isNew, setIsNew] = useState(false);

  const [form, setForm] = useState({
    name: '',
    role: 'Farmer',
    crop: 'Sugarcane',
    rating: 5,
    location: 'Karnataka',
    text: '',
    order: 0
  });

  const loadTestimonials = async () => {
    setLoading(true);
    try {
      const data = await testimonialService.getAll();
      setTestimonials(data || []);
    } catch (err) {
      showToast('Failed to load testimonials.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const handleOpenEdit = (t) => {
    setIsNew(false);
    setEditingItem(t);
    setForm({
      name: t.name || '',
      role: t.role || 'Farmer',
      crop: t.crop || 'Sugarcane',
      rating: t.rating || 5,
      location: t.location || 'Karnataka',
      text: t.text || '',
      order: t.order || 0
    });
  };

  const handleOpenCreate = () => {
    setIsNew(true);
    setEditingItem(true);
    setForm({
      name: '',
      role: 'Farmer',
      crop: 'Sugarcane',
      rating: 5,
      location: 'Karnataka',
      text: '',
      order: testimonials.length + 1
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (isNew) {
        await testimonialService.create(form);
        showToast('Testimonial created!', 'success');
      } else {
        await testimonialService.update(editingItem._id, form);
        showToast('Testimonial updated!', 'success');
      }
      setEditingItem(null);
      loadTestimonials();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to save testimonial.', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      await testimonialService.delete(id);
      showToast('Testimonial removed.', 'success');
      loadTestimonials();
    } catch (err) {
      showToast('Failed to delete testimonial.', 'error');
    }
  };

  return (
    <div>
      <div className="admin-panel-card">
        <div className="admin-panel-header">
          <div>
            <h3>Farmer Testimonials</h3>
            <p>Manage authentic feedback and quotes displayed on the website carousel</p>
          </div>

          <button
            className="btn btn-primary"
            style={{ padding: '8px 18px', fontSize: '13px' }}
            onClick={handleOpenCreate}
          >
            <Plus size={16} />
            <span>Add Testimonial</span>
          </button>
        </div>

        <div className="admin-table-responsive">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Farmer Name</th>
                <th>Crop & Role</th>
                <th>Rating</th>
                <th>Feedback Text</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '30px' }}>Loading testimonials...</td>
                </tr>
              ) : testimonials.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '30px' }}>No testimonials configured.</td>
                </tr>
              ) : (
                testimonials.map((t) => (
                  <tr key={t._id}>
                    <td>
                      <b>{t.name}</b>
                      <div style={{ fontSize: '11px', color: '#586B60' }}>{t.location}</div>
                    </td>
                    <td>
                      <span>{t.role}</span> • <b>{t.crop}</b>
                    </td>
                    <td>
                      <div style={{ color: '#E3B341', letterSpacing: '1px' }}>
                        {'★'.repeat(t.rating || 5)}
                      </div>
                    </td>
                    <td style={{ maxWidth: '380px', fontSize: '12px' }}>
                      "{t.text}"
                    </td>
                    <td>
                      <div className="action-btn-group">
                        <button
                          className="btn-action-icon"
                          title="Edit"
                          onClick={() => handleOpenEdit(t)}
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          className="btn-action-icon danger"
                          title="Delete"
                          onClick={() => handleDelete(t._id)}
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

      {/* Modal */}
      {editingItem && (
        <div className="admin-modal-backdrop" onClick={() => setEditingItem(null)}>
          <div className="admin-modal-window" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{isNew ? 'Add Testimonial' : 'Edit Testimonial'}</h3>
              <button className="admin-modal-close" onClick={() => setEditingItem(null)}>✕</button>
            </div>

            <form onSubmit={handleSave}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="admin-form-group">
                  <label className="admin-form-label">Farmer Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="admin-form-input"
                    placeholder="e.g. Ramesh Patil"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Role / Tag</label>
                  <input
                    type="text"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="admin-form-input"
                    placeholder="e.g. Sugarcane Farmer"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="admin-form-group">
                  <label className="admin-form-label">Crop</label>
                  <input
                    type="text"
                    value={form.crop}
                    onChange={(e) => setForm({ ...form, crop: e.target.value })}
                    className="admin-form-input"
                    placeholder="Sugarcane"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Location</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="admin-form-input"
                    placeholder="Karnataka"
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Feedback / Testimonial Text *</label>
                <textarea
                  rows="4"
                  required
                  value={form.text}
                  onChange={(e) => setForm({ ...form, text: e.target.value })}
                  className="admin-form-textarea"
                  placeholder="Enter the farmer quote..."
                />
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="btn btn-outline"
                  style={{ padding: '8px 16px', fontSize: '13px' }}
                  onClick={() => setEditingItem(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ padding: '8px 18px', fontSize: '13px' }}
                >
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
