'use client';

import { useState } from 'react';
import { Grip, X, ArrowRight } from 'lucide-react';

export default function Navbar({ availableTags, onApplyFilters }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Stores the full tag objects { id, title } for the UI chips
  const [tempTags, setTempTags] = useState<any[]>([]);
  const [activeTags, setActiveTags] = useState<any[]>([]);

  // Toggle selection inside the modal
  const handleTagToggle = (tag: any) => {
    setTempTags(prev => {
      const isSelected = prev.some(t => t.id === tag.id);
      if (isSelected) {
        return prev.filter(t => t.id !== tag.id);
      } else {
        return [...prev, tag];
      }
    });
  };

  // Triggers the database fetch
  const handleApply = () => {
    setActiveTags(tempTags);
    // Extract just the IDs to send to the Payload API query
    const tagIds = tempTags.map(t => t.id);
    onApplyFilters(tagIds);
    setIsModalOpen(false);
  };

  // Cancels the modal changes
  const handleClose = () => {
    setTempTags(activeTags);
    setIsModalOpen(false);
  };

  // Instant remove from the chip bar
  const handleRemoveChip = (tagId: string) => {
    const newTags = activeTags.filter(t => t.id !== tagId);
    setActiveTags(newTags);
    setTempTags(newTags);
    onApplyFilters(newTags.map(t => t.id));
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#050505]/90 backdrop-blur-md border-b border-white/10 px-6 py-4">
      <div className="max-w-[1600px] mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-medium tracking-tight text-white">
          heroship<span className="text-blue-500">.</span>
        </div>

        {/* Dynamic Action Group */}
        <div className="flex items-center gap-4">
          <button 
            onClick={isModalOpen && tempTags.length > 0 ? handleApply : () => setIsModalOpen(true)}
            className="text-sm font-medium uppercase tracking-widest text-white hover:text-[#05DF72] transition-colors"
          >
            {isModalOpen && tempTags.length > 0 ? 'Apply' : 'Filter'}
          </button>

          <button className="p-2 text-white hover:text-[#05DF72] transition-colors">
            {isModalOpen ? (
              <X onClick={handleClose} size={20} className="cursor-pointer" />
            ) : (
              <Grip size={20} className="cursor-default" />
            )}
          </button>
        </div>
      </div>

      {/* The Active Filter Chips (Outside Modal) */}
      {!isModalOpen && activeTags.length > 0 && (
        <div className="max-w-[1600px] mx-auto flex gap-2 mt-4 overflow-x-auto pb-2">
          {activeTags.map(tag => (
            <div key={tag.id} className="flex items-center gap-2 bg-zinc-800 border border-zinc-700 text-white text-xs px-3 py-1.5 rounded-md">
              {tag.title}
              <X 
                size={14} 
                className="cursor-pointer text-zinc-400 hover:text-red-400" 
                onClick={() => handleRemoveChip(tag.id)} 
              />
            </div>
          ))}
        </div>
      )}

      {/* The Filter Modal */}
      {isModalOpen && (
        <div className="ixed left-0 right-0 bottom-0 top-[73px] h-[calc(100dvh-73px)] bg-[#050505] flex flex-col p-8 md:px-16 overflow-y-auto z-40">
          <div className="max-w-[1600px] mx-auto w-full">
            <h2 className="text-zinc-500 uppercase text-xs mb-6 tracking-widest">Select Tags</h2>
            <div className="flex flex-wrap gap-3">
              {availableTags.map((tag: any) => {
                const isSelected = tempTags.some(t => t.id === tag.id);
                return (
                  <button
                    key={tag.id}
                    onClick={() => handleTagToggle(tag)}
                    className={`px-4 py-2 rounded-full border text-sm transition-all ${
                      isSelected
                        ? 'bg-white text-black border-white font-medium'
                        : 'border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200'
                    }`}
                  >
                    {tag.title}
                  </button>
                );
              })}
            </div>
            
            {/* {tempTags.length > 0 && (
              <button 
                onClick={handleApply}
                className="mt-12 flex items-center gap-2 bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-zinc-200 transition-colors"
              >
                Apply Filters <ArrowRight size={18} />
              </button>
            )} */}
          </div>
        </div>
      )}
    </nav>
  );
}