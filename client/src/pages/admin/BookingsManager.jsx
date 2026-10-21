import React, { useState, useEffect } from 'react';
import {
  CalendarCheck,
  Search,
  Filter,
  Trash2,
  CheckCircle,
  Clock,
  Phone,
  MessageCircle,
  ExternalLink,
  Edit2
} from 'lucide-react';
import { bookingService } from '../../services/api';

export default function BookingsManager({ showToast }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [cropFilter, setCropFilter] = useState('');
  const [search, setSearch] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [notes, setNotes] = useState('');

  const loadBookings = async () => {
    setLoading(true);
    try {
      const data = await bookingService.getAll({
        status: statusFilter || undefined,
        crop: cropFilter || undefined
      });
      setBookings(data || []);
    } catch (err) {
      showToast('Failed to load consultation bookings.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, [statusFilter, cropFilter]);

  const handleUpdateStatus = async (id, status, currentNotes) => {
    try {
      await bookingService.updateStatus(id, status, currentNotes);
      showToast(`Booking marked as ${status}`, 'success');
      setSelectedBooking(null);
      loadBookings();
    } catch (err) {
      showToast('Failed to update status', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this consultation request?')) return;
    try {
      await bookingService.delete(id);
      showToast('Consultation request deleted.', 'success');
      loadBookings();
    } catch (err) {
      showToast('Failed to delete booking.', 'error');
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const q = search.toLowerCase();
    return (
      b.name?.toLowerCase().includes(q) ||
      b.phone?.includes(q) ||
      b.area?.toLowerCase().includes(q) ||
      b.crop?.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <div className="admin-panel-card">
        <div className="admin-panel-header">
          <div>
            <h3>Consultation Bookings</h3>
            <p>Manage farmer consultation enquiries, update statuses, and follow up</p>
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search by farmer name, phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="admin-form-input"
              style={{ width: '220px', padding: '8px 12px' }}
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="admin-form-select"
              style={{ width: '140px', padding: '8px 12px' }}
            >
              <option value="">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <select
              value={cropFilter}
              onChange={(e) => setCropFilter(e.target.value)}
              className="admin-form-select"
              style={{ width: '140px', padding: '8px 12px' }}
            >
              <option value="">All Crops</option>
              <option value="Sugarcane">Sugarcane</option>
              <option value="Banana">Banana</option>
              <option value="Papaya">Papaya</option>
              <option value="Watermelon">Watermelon</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="admin-table-responsive">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Farmer Name</th>
                <th>Phone</th>
                <th>Crop</th>
                <th>Area / Location</th>
                <th>Status</th>
                <th>Query / Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '30px' }}>
                    Loading consultation bookings...
                  </td>
                </tr>
              ) : filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '30px', color: '#586B60' }}>
                    No bookings found matching current filters.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => {
                  let cleanPhone = b.phone?.replace(/[^0-9]/g, '') || '';
                  if (cleanPhone.length === 10) cleanPhone = `91${cleanPhone}`;
                  const waReplyUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hello ${b.name}, thank you for contacting Sri Nandi Krishi regarding ${b.crop} farming guidance.`)}`;

                  return (
                    <tr key={b._id}>
                      <td style={{ fontSize: '12px', color: '#586B60', whiteSpace: 'nowrap' }}>
                        {new Date(b.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </td>
                      <td>
                        <b>{b.name}</b>
                        {b.email && <div style={{ fontSize: '11px', color: '#819488' }}>{b.email}</div>}
                      </td>
                      <td>
                        <a
                          href={`tel:${cleanPhone}`}
                          style={{ color: '#124B2A', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}
                        >
                          <Phone size={13} />
                          {b.phone}
                        </a>
                      </td>
                      <td>
                        <span style={{ fontWeight: '600', color: '#124B2A' }}>{b.crop}</span>
                      </td>
                      <td style={{ fontSize: '12px' }}>{b.area || '—'}</td>
                      <td>
                        <span className={`badge-status ${b.status || 'New'}`}>
                          {b.status || 'New'}
                        </span>
                      </td>
                      <td style={{ maxWidth: '240px', fontSize: '12px' }}>
                        <div>{b.message || '—'}</div>
                        {b.notes && (
                          <div style={{ fontSize: '11px', color: '#E3B341', marginTop: '4px' }}>
                            <b>Note:</b> {b.notes}
                          </div>
                        )}
                      </td>
                      <td>
                        <div className="action-btn-group">
                          {/* Direct WhatsApp Response */}
                          {cleanPhone && (
                            <a
                              href={waReplyUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="btn-action-icon"
                              title="Message Farmer on WhatsApp"
                              style={{ color: '#25D366' }}
                            >
                              <MessageCircle size={15} />
                            </a>
                          )}

                          {/* Edit Status */}
                          <button
                            className="btn-action-icon"
                            title="Update Status & Notes"
                            onClick={() => {
                              setSelectedBooking(b);
                              setNewStatus(b.status || 'New');
                              setNotes(b.notes || '');
                            }}
                          >
                            <Edit2 size={14} />
                          </button>

                          {/* Delete */}
                          <button
                            className="btn-action-icon danger"
                            title="Delete Booking"
                            onClick={() => handleDelete(b._id)}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Status Edit Modal */}
      {selectedBooking && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedBooking(null)}>
          <div className="admin-modal-window" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>Update Booking Status</h3>
              <button className="admin-modal-close" onClick={() => setSelectedBooking(null)}>✕</button>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '14px', marginBottom: '6px' }}>
                Farmer: <b>{selectedBooking.name}</b> ({selectedBooking.phone})
              </div>
              <div style={{ fontSize: '13px', color: '#586B60' }}>
                Crop: {selectedBooking.crop} | Area: {selectedBooking.area || 'Not provided'}
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Status</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="admin-form-select"
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Admin Follow-up Notes</label>
              <textarea
                rows="3"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Spoke to farmer, recommended stage-2 fertilizer schedule..."
                className="admin-form-textarea"
              />
            </div>

            <div className="admin-modal-footer">
              <button
                className="btn btn-outline"
                style={{ padding: '8px 16px', fontSize: '13px' }}
                onClick={() => setSelectedBooking(null)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                style={{ padding: '8px 18px', fontSize: '13px' }}
                onClick={() => handleUpdateStatus(selectedBooking._id, newStatus, notes)}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
