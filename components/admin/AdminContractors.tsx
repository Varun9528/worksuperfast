'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as XLSX from 'xlsx';

export default function AdminContractors() {
  const [contractors, setContractors] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [previewFileUrl, setPreviewFileUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContractors() {
      try {
        const res = await fetch('/api/getcontractors');
        const json = await res.json();
        if (json.success) setContractors(json.contractors);
      } catch (err) {
        console.error('Error fetching contractors:', err);
      }
    }
    fetchContractors();
  }, []);

  const handleStatusChange = async (contractorId, newStatus) => {
    try {
      const res = await fetch('/api/updatestatus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contractorId, newStatus })
      });
      const json = await res.json();
      if (json.success) {
        setContractors(prev =>
          prev.map(c => (c._id === contractorId ? { ...c, status: newStatus } : c))
        );
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(contractors);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Contractors');
    XLSX.writeFile(workbook, 'ContractorsData.xlsx');
  };

  const filteredContractors = contractors.filter(contractor => {
    const matchesFilter = filter === 'all' || contractor.status === filter;
    const matchesSearch = contractor.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Contractors Management</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by name..."
            className="px-3 py-2 border rounded"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border rounded"
          >
            <option value="all">All</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>
          <button onClick={handleExport} className="px-4 py-2 bg-blue-500 text-white rounded">
            Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left text-sm font-semibold">Contractor</th>
              <th className="p-3">Contact</th>
              <th className="p-3">Skills</th>
              <th className="p-3">Experience</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContractors.map(contractor => (
              <motion.tr key={contractor._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <td className="p-3">{contractor.name}</td>
                <td className="p-3">{contractor.email}<br />{contractor.phone}</td>
                <td className="p-3">{(contractor.categories ?? []).join(', ')}</td>
                <td className="p-3">{contractor.experience ?? '-'} yrs</td>
                <td className="p-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    contractor.status === 'approved' ? 'bg-green-200 text-green-800' :
                    contractor.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-red-200 text-red-800'
                  }`}>
                    {contractor.status}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex gap-2">
                    {contractor.status === 'pending' && (
                      <button onClick={() => handleStatusChange(contractor._id, 'approved')} className="text-green-600">
                        ✅
                      </button>
                    )}
                    {contractor.status === 'approved' && (
                      <button onClick={() => handleStatusChange(contractor._id, 'suspended')} className="text-red-600">
                        🚫
                      </button>
                    )}
                    <button onClick={() => setSelectedContractor(contractor)} className="text-blue-600">
                      👁️
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {selectedContractor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
            <h2 className="text-xl font-semibold mb-4">Contractor Details</h2>
            <div className="space-y-2 text-gray-800">
              <p><strong>Name:</strong> {selectedContractor.name}</p>
              <p><strong>Email:</strong> {selectedContractor.email}</p>
              <p><strong>Phone:</strong> {selectedContractor.phone}</p>
              <p><strong>Address:</strong> {selectedContractor.address}</p>
              <p><strong>Experience:</strong> {selectedContractor.experience} years</p>
              <p><strong>Skills:</strong> {(selectedContractor.categories ?? []).join(', ')}</p>
            </div>

            {/* Single Attached Document */}
            {selectedContractor.idFilePath && (
              <div className="mt-4">
                <h3 className="font-semibold">Attached Document:</h3>
                <div
                  className="cursor-pointer mt-2"
                  onClick={() => setPreviewFileUrl(selectedContractor.idFilePath)}
                >
                  {/\.(jpg|jpeg|png|gif)$/i.test(selectedContractor.idFilePath) ? (
                    <img
                      src={selectedContractor.idFilePath}
                      alt="Preview"
                      className="w-full max-h-60 object-contain border rounded"
                    />
                  ) : /\.pdf$/i.test(selectedContractor.idFilePath) ? (
                    <iframe
                      src={selectedContractor.idFilePath}
                      className="w-full h-64 border rounded"
                      title="PDF Preview"
                    />
                  ) : null}
                </div>
                <a
                  href={selectedContractor.idFilePath}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline block mt-2"
                >
                  ⬇️ Download Document
                </a>
              </div>
            )}

            {/* Multiple Documents */}
            {Array.isArray(selectedContractor.documents) && selectedContractor.documents.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Other Documents:</h3>
                <div className="space-y-4">
                  {selectedContractor.documents.map((doc, index) => {
                    const isImage = /\.(jpg|jpeg|png|gif)$/i.test(doc.url);
                    const isPDF = /\.pdf$/i.test(doc.url);
                    return (
                      <div key={index} className="border p-2 rounded bg-gray-50">
                        <p className="text-sm font-medium">{doc.name || `Document ${index + 1}`}</p>
                        <div
                          className="cursor-pointer mt-2"
                          onClick={() => setPreviewFileUrl(doc.url)}
                        >
                          {isImage ? (
                            <img
                              src={doc.url}
                              alt={doc.name}
                              className="max-h-60 w-full object-contain rounded"
                            />
                          ) : isPDF ? (
                            <iframe
                              src={doc.url}
                              title={doc.name}
                              className="w-full h-64 border rounded"
                            />
                          ) : null}
                        </div>
                        <a
                          href={doc.url}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline block mt-2"
                        >
                          ⬇️ Download
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedContractor(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Preview */}
      {previewFileUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="relative max-w-6xl w-full h-[90vh] bg-white p-4 rounded-lg overflow-hidden">
            <button
              onClick={() => setPreviewFileUrl(null)}
              className="absolute top-2 right-2 text-white bg-black rounded-full p-2 hover:bg-gray-700 z-50"
            >
              ✕
            </button>
            {/\.(jpg|jpeg|png|gif)$/i.test(previewFileUrl) ? (
              <img
                src={previewFileUrl}
                alt="Full Preview"
                className="w-full h-full object-contain"
              />
            ) : /\.pdf$/i.test(previewFileUrl) ? (
              <iframe
                src={previewFileUrl}
                className="w-full h-full"
                title="Full PDF Preview"
              />
            ) : (
              <p className="text-center text-white">Unsupported file type.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
