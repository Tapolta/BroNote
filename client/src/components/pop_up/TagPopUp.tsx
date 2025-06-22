import { PlusIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useMemo, useEffect } from "react";
import { NoteTagProps } from "../../types/GlobalTypes";
import { getTags, saveTags } from "../../utils/localstorage";

interface TagPopUpProp {
    onDelete?: () => void;
}

const colorOptions = [
    { name: 'Red', value: 'red' },
    { name: 'Blue', value: 'blue' },
    { name: 'Green', value: 'green' },
    { name: 'Yellow', value: 'yellow' },
    { name: 'Purple', value: 'purple' },
    { name: 'Pink', value: 'pink' }
];

const TagPopUp = ({ onDelete }: TagPopUpProp) => {
    const [tab, setTab] = useState<'Create' | 'Delete'>('Create');
    const [newTag, setNewTag] = useState<NoteTagProps>({ name: '', color: '#ef4444' });
    const [tags, setTags] = useState<NoteTagProps[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    // Filter tags based on search term
    const filteredTags = useMemo(() => {
        return tags.filter(tag => 
            tag.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [tags, searchTerm]);

    const tabHandle = (tabName: 'Create' | 'Delete') => {
        setTab(tabName);
        setNewTag({ name: '', color: '#ef4444' });
        setSearchTerm('');
        setSelectedTags([]);
    };

    const handleCreateTag = () => {
        if (newTag.name.trim() && !tags.some(tag => tag.name === newTag.name.trim())) {
            const updatedTags = [...tags, { ...newTag, name: newTag.name.trim() }];
            setTags(updatedTags);
            saveTags(updatedTags);
            setNewTag({ name: '', color: '#ef4444' });
        }
    };

    const handleDeleteTags = () => {
        if (selectedTags.length > 0) {
            const updatedTags = tags.filter(tag => !selectedTags.includes(tag.name));
            setTags(updatedTags);
            setSelectedTags([]);
            saveTags(updatedTags);
            
            if (onDelete) {
                onDelete();
            }
        }
    };

    const toggleTagSelection = (tagName: string) => {
        setSelectedTags(prev => 
            prev.includes(tagName) 
                ? prev.filter(t => t !== tagName) 
                : [...prev, tagName]
        );
    };

    useEffect(() => {
        setTags(getTags());
    },[])

    return (
        <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
                <button
                    onClick={() => tabHandle('Create')}
                    className={`px-4 py-2 font-medium text-sm focus:outline-none ${
                        tab === 'Create'
                            ? 'text-green-600 border-b-2 border-green-600 dark:text-green-400 dark:border-green-400'
                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                >
                    Create Tag
                </button>
                <button
                    onClick={() => tabHandle('Delete')}
                    className={`px-4 py-2 font-medium text-sm focus:outline-none ${
                        tab === 'Delete'
                            ? 'text-green-600 border-b-2 border-green-600 dark:text-green-400 dark:border-green-400'
                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                >
                    Delete Tag
                </button>
            </div>

            {/* Tab Content */}
            <div className="space-y-4">
                {tab === 'Create' ? (
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="tagName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Tag Name
                            </label>
                            <input
                                type="text"
                                id="tagName"
                                value={newTag.name}
                                onChange={(e) => setNewTag({...newTag, name: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                                placeholder="Enter tag name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Tag Color
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {colorOptions.map(color => (
                                    <button
                                        key={color.value}
                                        onClick={() => setNewTag({...newTag, color: color.value})}
                                        className={`w-8 h-8 rounded-full ${newTag.color === color.value ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
                                        style={{ backgroundColor: color.value }}
                                        title={color.name}
                                    />
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={handleCreateTag}
                            disabled={!newTag.name.trim()}
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md disabled:bg-green-400 dark:disabled:bg-green-800 transition-colors flex items-center justify-center gap-2"
                        >
                            <PlusIcon className="h-5 w-5" />
                            Create Tag
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {/* Search Bar */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                placeholder="Search tags..."
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                                </button>
                            )}
                        </div>

                        {/* Selected Tags Indicator */}
                        {selectedTags.length > 0 && (
                            <div className="text-sm text-green-600 dark:text-green-400">
                                {selectedTags.length} tag(s) selected
                            </div>
                        )}

                        {/* Tags List */}
                        <div className="space-y-2 max-h-60 overflow-y-auto">
                            {filteredTags.length > 0 ? (
                                filteredTags.map(tag => (
                                    <div
                                        key={tag.name}
                                        onClick={() => toggleTagSelection(tag.name)}
                                        className={`p-3 border rounded-md cursor-pointer flex items-center gap-3 ${
                                            selectedTags.includes(tag.name)
                                                ? 'border-green-500 bg-green-50 dark:bg-gray-700'
                                                : 'border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700'
                                        }`}
                                    >
                                        <div 
                                            className="w-4 h-4 rounded-full flex-shrink-0"
                                            style={{ backgroundColor: tag.color }}
                                        />
                                        <span className="flex-grow dark:text-white">{tag.name}</span>
                                        {selectedTags.includes(tag.name) && (
                                            <span className="text-green-500">✓</span>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                                    {searchTerm ? 'No matching tags found' : 'No tags available'}
                                </div>
                            )}
                        </div>

                        {/* Delete Button */}
                        {tags.length > 0 && (
                            <button
                                onClick={handleDeleteTags}
                                disabled={selectedTags.length === 0}
                                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md disabled:bg-red-400 dark:disabled:bg-red-800 transition-colors"
                            >
                                Delete Selected ({selectedTags.length})
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TagPopUp;