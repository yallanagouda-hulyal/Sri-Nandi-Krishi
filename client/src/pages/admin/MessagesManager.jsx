import React, { useState, useEffect } from 'react';
import { Mail, Trash2, CheckCircle2, Clock } from 'lucide-react';
import { contactService } from '../../services/api';

export default function MessagesManager({ showToast }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMessages = async () => {
    setLoading(true);
    try {
      const data = await contactService.getAll();
      setMessages(data || []);
    } catch (err) {
      showToast('Failed to load contact messages.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await contactService.updateStatus(id, status);
      showToast(`Message marked as ${status}`, 'success');
      loadMessages();
    } catch (err) {
      showToast('Failed to update message status', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await contactService.delete(id);
      showToast('Message deleted.', 'success');
      loadMessages();
    } catch (err) {
      showToast('Failed to delete message.', 'error');
    }
  };

  return (
    <div className="admin-panel-card">
      <div className="admin-panel-header">
        <div>
          <h3>Contact Messages</h3>
          <p>Direct enquiries received from farmers through the website contact section</p>
        </div>
      </div>

      <div className="admin-table-responsive">
        <table className="admin-data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Contact Details</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '30px' }}>Loading messages...</td>
              </tr>
            ) : messages.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '30px' }}>No messages found.</td>
              </tr>
            ) : (
              messages.map((msg) => (
                <tr key={msg._id}>
                  <td style={{ fontSize: '12px', color: '#586B60', whiteSpace: 'nowrap' }}>
                    {new Date(msg.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short'
                    })}
                  </td>
                  <td><b>{msg.name}</b></td>
                  <td style={{ fontSize: '12px' }}>
                    <div><a href={`mailto:${msg.email}`} style={{ color: '#124B2A' }}>{msg.email}</a></div>
                    {msg.phone && <div style={{ color: '#586B60' }}>{msg.phone}</div>}
                  </td>
                  <td style={{ fontWeight: '500' }}>{msg.subject || 'General'}</td>
                  <td style={{ maxWidth: '300px', fontSize: '12px' }}>{msg.message}</td>
                  <td>
                    <span className={`badge-status ${msg.status || 'New'}`}>
                      {msg.status || 'New'}
                    </span>
                  </td>
                  <td>
                    <div className="action-btn-group">
                      {msg.status !== 'Replied' && (
                        <button
                          className="btn-action-icon"
                          title="Mark as Replied"
                          onClick={() => handleUpdateStatus(msg._id, 'Replied')}
                        >
                          <CheckCircle2 size={14} />
                        </button>
                      )}
                      <button
                        className="btn-action-icon danger"
                        title="Delete Message"
                        onClick={() => handleDelete(msg._id)}
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
  );
}
