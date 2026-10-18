import React, { useState, useEffect } from 'react';
import { Package, Plus, Edit2, Trash2, CheckCircle, ExternalLink } from 'lucide-react';
import { cropService } from '../../services/api';

export default function ServicesManager({ showToast }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState(null);
  const [isNew, setIsNew] = useState(false);

  const [form, setForm] = useState({
    name: '',
    cropName: '',
    slug: '',
    subtitle: '',
    shortDescription: '',
    fullDescription: '',
    cardImage: '',
    heroImage: '',
    highlights: '',
    order: 0
  });

  const loadServices = async () => {
    setLoading(true);
    try {
      const data = await cropService.getAll();
      setServices(data || []);
    } catch (err) {
      showToast('Failed to load crop services.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleOpenEdit = (svc) => {
    setIsNew(false);
    setEditingService(svc);
    setForm({
      name: svc.name || '',
      cropName: svc.cropName || '',
      slug: svc.slug || '',
      subtitle: svc.subtitle || '',
      shortDescription: svc.shortDescription || '',
      fullDescription: svc.fullDescription || '',
      cardImage: svc.cardImage || '',
      heroImage: svc.heroImage || '',
      highlights: (svc.highlights || []).join(', '),
      order: svc.order || 0
    });
  };

  const handleOpenCreate = () => {
    setIsNew(true);
    setEditingService(true);
    setForm({
      name: '',
      cropName: '',
      slug: '',
      subtitle: '',
      shortDescription: '',
      fullDescription: '',
      cardImage: '/images/sugarcane-crop.jpg',
      heroImage: '/images/sugarcane-field.jpg',
      highlights: 'Variety Selection, Fertilizer Guidance, Irrigation Management',
      order: services.length + 1
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        highlights: form.highlights.split(',').map((s) => s.trim()).filter(Boolean)
      };

      if (isNew) {
        await cropService.create(payload);
        showToast('New crop service created!', 'success');
      } else {
        await cropService.update(editingService._id, payload);
        showToast('Crop service updated successfully!', 'success');
      }
      setEditingService(null);
      loadServices();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to save service.', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this crop service?')) return;
    try {
      await cropService.delete(id);
      showToast('Crop service removed.', 'success');
      loadServices();
    } catch (err) {
      showToast('Failed to delete service.', 'error');
    }
  };

  return (
    <div>
      <div className="admin-panel-card">
        <div className="admin-panel-header">
          <div>
            <h3>Crop Guidance Services</h3>
            <p>Manage the 4 primary commercial crops and cultivation highlights</p>
          </div>

          <button
            className="btn btn-primary"
            style={{ padding: '8px 18px', fontSize: '13px' }}
            onClick={handleOpenCreate}
          >
            <Plus size={16} />
            <span>Add New Service</span>
          </button>
        </div>

        <div className="admin-table-responsive">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Crop Service</th>
                <th>Slug</th>
                <th>Highlights</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '30px' }}>Loading services...</td>
                </tr>
              ) : services.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '30px' }}>No crop services configured.</td>
                </tr>
              ) : (
                services.map((svc) => (
                  <tr key={svc._id}>
                    <td><b>0{svc.order || 1}</b></td>
                    <td>
                      <b>{svc.name}</b>
                      <div style={{ fontSize: '11px', color: '#586B60' }}>{svc.subtitle}</div>
                    </td>
                    <td>
                      <code>/services/{svc.slug}</code>
                    </td>
                    <td style={{ maxWidth: '300px', fontSize: '12px' }}>
                      {(svc.highlights || []).join(' • ')}
                    </td>
                    <td>
                      <div className="action-btn-group">
                        <button
                          className="btn-action-icon"
                          title="Edit Service"
                          onClick={() => handleOpenEdit(svc)}
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          className="btn-action-icon danger"
                          title="Delete Service"
                          onClick={() => handleDelete(svc._id)}
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

      {/* Edit / Create Modal */}
      {editingService && (
        <div className="admin-modal-backdrop" onClick={() => setEditingService(null)}>
          <div className="admin-modal-window" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{isNew ? 'Create New Crop Service' : `Edit ${form.name}`}</h3>
              <button className="admin-modal-close" onClick={() => setEditingService(null)}>✕</button>
            </div>

            <form onSubmit={handleSave}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="admin-form-group">
                  <label className="admin-form-label">Service Title</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="admin-form-input"
                    placeholder="e.g. Sugarcane Farming"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Crop Name</label>
                  <input
                    type="text"
                    required
                    value={form.cropName}
                    onChange={(e) => setForm({ ...form, cropName: e.target.value })}
                    className="admin-form-input"
                    placeholder="e.g. Sugarcane"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="admin-form-group">
                  <label className="admin-form-label">URL Slug</label>
                  <input
                    type="text"
                    required
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/ /g, '-') })}
                    className="admin-form-input"
                    placeholder="e.g. sugarcane"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Display Order</label>
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                    className="admin-form-input"
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Subtitle / Tagline</label>
                <input
                  type="text"
                  value={form.subtitle}
                  onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                  className="admin-form-input"
                  placeholder="e.g. High yield • Better quality • Expert guidance"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Short Description (for card)</label>
                <textarea
                  rows="2"
                  required
                  value={form.shortDescription}
                  onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                  className="admin-form-textarea"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Full Description (for detail page)</label>
                <textarea
                  rows="3"
                  value={form.fullDescription}
                  onChange={(e) => setForm({ ...form, fullDescription: e.target.value })}
                  className="admin-form-textarea"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Card Image URL</label>
                <input
                  type="text"
                  value={form.cardImage}
                  onChange={(e) => setForm({ ...form, cardImage: e.target.value })}
                  className="admin-form-input"
                  placeholder="/images/sugarcane-crop.jpg"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Service Highlights (comma-separated)</label>
                <input
                  type="text"
                  value={form.highlights}
                  onChange={(e) => setForm({ ...form, highlights: e.target.value })}
                  className="admin-form-input"
                  placeholder="Variety Selection, Fertilizer Guidance, Irrigation Management"
                />
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="btn btn-outline"
                  style={{ padding: '8px 16px', fontSize: '13px' }}
                  onClick={() => setEditingService(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ padding: '8px 18px', fontSize: '13px' }}
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
