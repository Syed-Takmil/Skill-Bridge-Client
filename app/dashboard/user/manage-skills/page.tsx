'use client';

import { authClient } from '@/app/lib/auth-client';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

interface SkillItem {
  _id?: any;    // MongoDB Document ID (can be string, or nested {$oid: string})
  id?: number;   // Legacy Numeric ID
  title: string;
  category: string;
  description: string;
  level: string;
  availability: string;
  languages: string;
  location: string;
  curriculum: string[];
  instructor?: {
    name?: string;
    email?: string;
    avatarUrl?: string;
  };
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function ManageSkillsPage() {
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userSession, setUserSession] = useState<any>(null);
  const [editingSkill, setEditingSkill] = useState<SkillItem | null>(null);
  const [deletingSkill, setDeletingSkill] = useState<SkillItem | null>(null); 
  const [isDeleting, setIsDeleting] = useState(false);

  // Edit Form Fields
  const [editForm, setEditForm] = useState({
    title: '',
    category: '',
    description: '',
    level: 'Intermediate',
    availability: 'Weekdays',
    languages: 'English',
    location: '',
    imageUrl: '',
  });
  const [editCurriculum, setEditCurriculum] = useState<string[]>([]);
  const [currentChapter, setCurrentChapter] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  // Helper function to reliably extract the ID string from different Mongo JSON representations
  const getCleanId = (skill: SkillItem | null): string => {
    if (!skill) return '';
    if (typeof skill._id === 'string') return skill._id;
    if (skill._id && typeof skill._id === 'object' && skill._id.$oid) return skill._id.$oid;
    if (skill.id) return String(skill.id);
    return '';
  };

  // Load Session first, then Fetch User-Owned Skills
  useEffect(() => {
    const checkSessionAndFetch = async () => {
      try {
        const { data } = await authClient.getSession();
        console.log('User Session Payload:', data);

        const user = data?.user;

        if (user && user.email) {
          setUserSession(user);
          await fetchUserSkills(user.email);
        } else {
          console.warn('Session loaded but email was empty or user object was unresolvable.');
          toast.error('Authentication email is missing. Please log in again.');
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Session matching error:', err);
        toast.error('Could not authenticate user.');
        setIsLoading(false);
      }
    };
    checkSessionAndFetch();
  }, []);

  const fetchUserSkills = async (email: string) => {
    if (!email) return;
    try {
      setIsLoading(true);
      const url = `${API_BASE_URL}/skills?email=${encodeURIComponent(email)}`;
      console.log('Fetching user skills via:', url);

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setSkills(data);
      } else {
        throw new Error(`Server returned status: ${response.status}`);
      }
    } catch (err) {
      console.error('Fetch skills error:', err);
      toast.error('Failed to load your personal skill listings.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingSkill) return;
    setIsDeleting(true);

    try {
      const targetId = getCleanId(deletingSkill);
      
      if (!targetId) {
        throw new Error('No valid ID exists on this skill document to delete.');
      }

      console.log(`Sending DELETE request to: ${API_BASE_URL}/skills/${targetId}`);

      const response = await fetch(`${API_BASE_URL}/skills/${targetId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errPayload = await response.json().catch(() => ({}));
        throw new Error(errPayload.message || `Server error: ${response.status}`);
      }

      toast.success('Skill deleted successfully!');
      
      // Filter matching state using clean string comparison
      setSkills((prev) => 
        prev.filter((item) => getCleanId(item) !== targetId)
      );
      setDeletingSkill(null);
    } catch (err: any) {
      console.error('Delete action failed:', err);
      toast.error(err.message || 'Could not delete the skill listing.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleOpenEditModal = (skill: SkillItem) => {
    setEditingSkill(skill);
    setEditForm({
      title: skill.title || '',
      category: skill.category || 'Programming',
      description: skill.description || '',
      level: skill.level || 'Intermediate',
      availability: skill.availability || 'Weekdays',
      languages: skill.languages || 'English',
      location: skill.location || '',
      imageUrl: skill.instructor?.avatarUrl || '',
    });
    setEditCurriculum(skill.curriculum || []);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill || !userSession) return;
    setIsUpdating(true);

    const updatedPayload = {
      title: editForm.title,
      category: editForm.category,
      description: editForm.description,
      level: editForm.level,
      availability: editForm.availability,
      languages: editForm.languages,
      location: editForm.location || 'Remote',
      instructor: {
        name: userSession.name || "Verified Instructor",
        email: userSession.email, 
        avatarUrl: editForm.imageUrl || userSession.image || '',
        role: `${editForm.level} ${editForm.category} Consultant`
      },
      curriculum: editCurriculum,
    };

    try {
      const targetId = getCleanId(editingSkill);
      if (!targetId) {
        throw new Error('No valid ID exists on this skill document to update.');
      }

      console.log(`Sending PUT request to: ${API_BASE_URL}/skills/${targetId}`);

      const response = await fetch(`${API_BASE_URL}/skills/${targetId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPayload),
      });

      if (!response.ok) {
        const errPayload = await response.json().catch(() => ({}));
        throw new Error(errPayload.message || `Server error: ${response.status}`);
      }

      toast.success('Skill updated successfully!');
      setEditingSkill(null); 
      fetchUserSkills(userSession.email); 
    } catch (err: any) {
      console.error('Update action failed:', err);
      toast.error(err.message || 'Failed to save changes.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAddChapter = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentChapter.trim() !== '') {
      setEditCurriculum((prev) => [...prev, currentChapter.trim()]);
      setCurrentChapter('');
    }
  };

  const handleRemoveChapter = (indexToRemove: number) => {
    setEditCurriculum((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full flex flex-col gap-6">
      
      <div className="flex justify-between items-center border-b border-gray-150 dark:border-gray-800/80 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Manage Skills</h1>
          <p className="text-sm text-gray-550 dark:text-gray-400 mt-0.5">
            Edit, update, or remove the skills you are teaching the community.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : skills.length > 0 ? (
        <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-950 border-b border-gray-150 dark:border-gray-800 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <th className="py-4 px-6">Skill Title</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Difficulty</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-150 dark:divide-gray-800 text-sm">
                {skills.map((skill) => {
                  const keyId = getCleanId(skill);
                  return (
                    <tr key={keyId} className="hover:bg-slate-50/40 dark:hover:bg-gray-950/20 transition-colors">
                      <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white max-w-[280px] truncate">
                        {skill.title}
                      </td>
                      <td className="py-4 px-6 text-gray-500 dark:text-gray-400">{skill.category}</td>
                      <td className="py-4 px-6">
                        <span className="bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">
                          {skill.level}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right flex items-center justify-end gap-3 h-full">
                        <button
                          onClick={() => handleOpenEditModal(skill)}
                          className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeletingSkill(skill)}
                          className="text-xs font-bold text-red-500 hover:text-red-700 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-12 text-center text-sm text-gray-400">
          Your listed skills will map out here. Get started by adding a skill!
        </div>
      )}

      {/* ================= EDIT MODAL OVERLAY ================= */}
      {editingSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="relative max-w-2xl w-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">Edit Skill Listing</h2>
              <button
                onClick={() => setEditingSkill(null)}
                className="text-gray-400 hover:text-gray-650 dark:hover:text-gray-200 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdate} className="flex flex-col gap-5 text-left">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Skill Title</label>
                <input
                  type="text"
                  required
                  value={editForm.title}
                  onChange={(e) => setEditForm((p) => ({ ...p, title: e.target.value }))}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-250 dark:border-gray-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Category</label>
                <select
                  required
                  value={editForm.category}
                  onChange={(e) => setEditForm((p) => ({ ...p, category: e.target.value }))}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-250 dark:border-gray-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 dark:text-gray-300"
                >
                  <option value="Marketing">Marketing</option>
                  <option value="Programming">Programming</option>
                  <option value="Design">Design</option>
                  <option value="Language">Language</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Description</label>
                <textarea
                  required
                  rows={3}
                  value={editForm.description}
                  onChange={(e) => setEditForm((p) => ({ ...p, description: e.target.value }))}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-250 dark:border-gray-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white resize-none"
                />
              </div>

              {/* Curriculum Area */}
              <div className="flex flex-col gap-2 bg-slate-50/50 dark:bg-slate-950/40 p-4 rounded-xl border border-gray-150 dark:border-gray-800">
                <label className="text-sm font-bold text-gray-800 dark:text-gray-200">Curriculum / Core Topics</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentChapter}
                    onChange={(e) => setCurrentChapter(e.target.value)}
                    placeholder="Add curriculum module..."
                    className="flex-1 bg-white dark:bg-slate-950 border border-gray-205 dark:border-gray-800 rounded-xl px-4 py-2 text-sm focus:outline-none text-gray-950 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddChapter}
                    className="bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950 text-indigo-650 dark:text-indigo-400 text-xs font-bold px-3 py-2 rounded-xl"
                  >
                    + Add Topic
                  </button>
                </div>

                {editCurriculum.length > 0 && (
                  <ul className="flex flex-col gap-2 mt-2 bg-white dark:bg-slate-950 p-2 rounded-lg border border-gray-200 dark:border-gray-850">
                    {editCurriculum.map((topic, idx) => (
                      <li key={idx} className="flex justify-between items-center px-3 py-1.5 text-xs">
                        <span className="text-gray-700 dark:text-gray-300">{idx + 1}. {topic}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveChapter(idx)}
                          className="text-red-500 hover:underline font-bold"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Difficulty</label>
                  <select
                    value={editForm.level}
                    onChange={(e) => setEditForm((p) => ({ ...p, level: e.target.value }))}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-gray-800 rounded-xl p-2.5 text-sm mt-1 focus:outline-none text-gray-750 dark:text-gray-300"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Availability</label>
                  <select
                    value={editForm.availability}
                    onChange={(e) => setEditForm((p) => ({ ...p, availability: e.target.value }))}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-gray-800 rounded-xl p-2.5 text-sm mt-1 focus:outline-none text-gray-750 dark:text-gray-300"
                  >
                    <option value="Anytime">Anytime</option>
                    <option value="Weekdays">Weekdays</option>
                    <option value="Weekends">Weekends</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Language</label>
                  <select
                    value={editForm.languages}
                    onChange={(e) => setEditForm((p) => ({ ...p, languages: e.target.value }))}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-gray-800 rounded-xl p-2.5 text-sm mt-1 focus:outline-none text-gray-750 dark:text-gray-300"
                  >
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Bengali">Bengali</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setEditingSkill(null)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold py-2.5 rounded-xl text-sm transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-bold py-2.5 rounded-xl text-sm transition-all shadow-md"
                >
                  {isUpdating ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ================= CUSTOM DELETE MODAL OVERLAY ================= */}
      {deletingSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative max-w-md w-full bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-2xl shadow-2xl p-6 text-center flex flex-col items-center gap-4 animate-in fade-in zoom-in-95 duration-200">
            
            <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-950/50 flex items-center justify-center text-red-500 dark:text-red-400 text-xl font-bold">
              ⚠️
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Delete Skill Listing?</h3>
              <p className="text-sm text-gray-550 dark:text-gray-400 mt-1.5 px-2">
                Are you sure you want to delete <strong className="text-gray-800 dark:text-gray-200">"{deletingSkill.title}"</strong>? This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-3 w-full mt-2">
              <button
                type="button"
                onClick={() => setDeletingSkill(null)}
                disabled={isDeleting}
                className="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-gray-800 dark:hover:bg-gray-750 text-gray-800 dark:text-gray-250 font-semibold py-2.5 rounded-xl text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="flex-1 bg-red-600 hover:bg-red-700 dark:bg-red-650 dark:hover:bg-red-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors shadow-sm"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}