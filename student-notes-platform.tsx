import React, { useState } from 'react';
import { Upload, BookOpen, Users, Search, X } from 'lucide-react';

export default function StudentNotesApp() {
  const [view, setView] = useState('browse');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'Calculus I - Complete Notes',
      subject: 'Mathematics',
      helper: 'Sarah Chen',
      description: 'Comprehensive notes covering limits, derivatives, and integrals with examples',
      grade: 'University',
      image: '📐'
    },
    {
      id: 2,
      title: 'Biology Chapter 1-5 Summary',
      subject: 'Biology',
      helper: 'John Smith',
      description: 'Detailed summaries of cell biology, genetics, and ecology',
      grade: 'High School',
      image: '🧬'
    },
    {
      id: 3,
      title: 'English Literature Essay Guide',
      subject: 'English',
      helper: 'Emma Wilson',
      description: 'Step-by-step guide for writing literary analysis essays',
      grade: 'High School',
      image: '📚'
    },
    {
      id: 4,
      title: 'Physics - Mechanics Notes',
      subject: 'Physics',
      helper: 'David Lee',
      description: 'Newton\'s laws, motion, forces, and energy with solved problems',
      grade: 'University',
      image: '⚛️'
    }
  ]);

  const [uploadForm, setUploadForm] = useState({
    title: '',
    subject: '',
    description: '',
    grade: '',
    helper: ''
  });

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.helper.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpload = (e) => {
    e.preventDefault();
    if (uploadForm.title && uploadForm.subject && uploadForm.helper) {
      const newNote = {
        id: notes.length + 1,
        ...uploadForm,
        image: '📄'
      };
      setNotes([newNote, ...notes]);
      setUploadForm({ title: '', subject: '', description: '', grade: '', helper: '' });
      setView('browse');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-blue-500" />
              <h1 className="text-3xl font-bold text-gray-800">StudyShare</h1>
            </div>
            <p className="text-gray-600 hidden sm:block">Share Knowledge, Help Each Other</p>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1">
            <button
              onClick={() => setView('browse')}
              className={`px-6 py-3 font-medium transition-colors ${
                view === 'browse'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Browse Notes
            </button>
            <button
              onClick={() => setView('upload')}
              className={`px-6 py-3 font-medium transition-colors ${
                view === 'upload'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Share Your Notes
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Browse View */}
        {view === 'browse' && (
          <div>
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by subject, title, or helper name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 focus:border-blue-400 focus:outline-none text-lg"
                />
              </div>
            </div>

            {/* Notes Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map((note) => (
                <div
                  key={note.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow cursor-pointer overflow-hidden"
                  onClick={() => setSelectedItem(note)}
                >
                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-8 flex items-center justify-center">
                    <span className="text-6xl">{note.image}</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-lg text-gray-800 flex-1">{note.title}</h3>
                    </div>
                    <div className="flex gap-2 mb-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {note.subject}
                      </span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        {note.grade}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{note.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Users className="w-4 h-4" />
                      <span>By {note.helper}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredNotes.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No notes found. Try a different search term.</p>
              </div>
            )}
          </div>
        )}

        {/* Upload View */}
        {view === 'upload' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <Upload className="w-8 h-8 text-blue-500" />
                <h2 className="text-2xl font-bold text-gray-800">Share Your Notes</h2>
              </div>
              <p className="text-gray-600 mb-8">Help other students by sharing your notes and study materials</p>

              <form onSubmit={handleUpload}>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                    <input
                      type="text"
                      value={uploadForm.helper}
                      onChange={(e) => setUploadForm({ ...uploadForm, helper: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={uploadForm.title}
                      onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
                      placeholder="e.g., Chemistry Chapter 3 Notes"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <input
                      type="text"
                      value={uploadForm.subject}
                      onChange={(e) => setUploadForm({ ...uploadForm, subject: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
                      placeholder="e.g., Chemistry, Mathematics"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Grade Level</label>
                    <select
                      value={uploadForm.grade}
                      onChange={(e) => setUploadForm({ ...uploadForm, grade: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
                      required
                    >
                      <option value="">Select grade level</option>
                      <option value="High School">High School</option>
                      <option value="University">University</option>
                      <option value="Middle School">Middle School</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={uploadForm.description}
                      onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none h-32 resize-none"
                      placeholder="Describe what your notes cover..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 rounded-lg transition-colors"
                  >
                    Share Notes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedItem(null)}>
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-12 flex items-center justify-center relative">
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="text-8xl">{selectedItem.image}</span>
            </div>
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{selectedItem.title}</h2>
              <div className="flex gap-2 mb-6">
                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium">
                  {selectedItem.subject}
                </span>
                <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-medium">
                  {selectedItem.grade}
                </span>
              </div>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">{selectedItem.description}</p>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Shared by</p>
                    <p className="font-semibold text-gray-800 text-lg">{selectedItem.helper}</p>
                  </div>
                </div>
              </div>
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 rounded-lg transition-colors">
                Request These Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}