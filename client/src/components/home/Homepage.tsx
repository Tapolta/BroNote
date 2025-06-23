import {
  TagIcon,
  CalendarIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import DateGroup from './DateCard';
import AddNote from './AddMenu';
import ThemeToggle from '../ThemeToggle';
import { useEffect, useState, useMemo } from 'react';
import { NoteTagProps } from '../../types/GlobalTypes';
import { getNotes, getTags } from '../../utils/localstorage';
import { NoteProps } from '../../types/GlobalTypes';
import NoteCard from './NoteCard';
import { groupNotesByDate } from '../../utils/groupNotes';
import { isToday, isThisWeek, isThisMonth, format, subMonths } from "date-fns";
import { Link } from 'react-router-dom';
import TagStyle from '../ui/TagStyle';

const Homepage = () => {
  const [tags, setTags] = useState<NoteTagProps[]>([]);
  const [allNotes, setAllNotes] = useState<NoteProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDateFilter, setSelectedDateFilter] = useState('All Dates');
  const [selectedTagFilter, setSelectedTagFilter] = useState('All Tags');

  useEffect(() => {
    setIsLoading(true);
    const savedNotes = getNotes();
    const sorted = savedNotes.sort(
      (a: NoteProps, b: NoteProps) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setAllNotes(sorted);
    setIsLoading(false);
  }, []);

  const filteredNotes = useMemo(() => {
    return allNotes.filter(note => {
      const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          note.content.toLowerCase().includes(searchQuery.toLowerCase());
      
      const noteDate = new Date(note.date);
      let matchesDate = true;
      
      switch(selectedDateFilter) {
        case 'Today':
          matchesDate = isToday(noteDate);
          break;
        case 'This Week':
          matchesDate = isThisWeek(noteDate, { weekStartsOn: 1 });
          break;
        case 'This Month':
          matchesDate = isThisMonth(noteDate);
          break;
        case 'Last 3 Months':
          matchesDate = noteDate > subMonths(new Date(), 3);
          break;
        default:
          matchesDate = true;
      }
      
      const matchesTag = selectedTagFilter === 'All Tags' || 
                        note.tag?.name === selectedTagFilter;
      
      return matchesSearch && matchesDate && matchesTag;
    });
  }, [allNotes, searchQuery, selectedDateFilter, selectedTagFilter]);

  const formatDateLabel = (dateString: string): string => {
    const date = new Date(dateString);

    if (isToday(date)) return "Today";
    if (isThisWeek(date, { weekStartsOn: 1 })) return "This Week";
    if (isThisMonth(date)) return "This Month";

    return format(date, "MMMM d, yyyy");
  }

  const handleRefresh = () => {
    setIsLoading(true);
    const savedNotes = getNotes();
    const sorted = savedNotes.sort(
      (a: NoteProps, b: NoteProps) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setAllNotes(sorted);
    setIsLoading(false);
  };

  const tagsHandle = () => {
    setTags(getTags());
  }

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 sm:p-8 md:p-10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center gap-3">
              <div className="bg-green-500 p-3 rounded-full shadow-lg">
                <DocumentTextIcon className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">BroNote</h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">Your personal thought companion</p>
              </div>
            </div>
            
            <div className="md:hidden">
              <ThemeToggle />
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-grow max-w-sm md:max-w-md">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-11 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-sm
                           focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400
                           placeholder-gray-500 dark:placeholder-gray-400 text-gray-800 dark:text-gray-200 transition-all duration-200"
                placeholder="Search notes..."
              />
            </div>
            
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-10 items-center justify-start">
          <div className="relative group w-full sm:w-auto flex-shrink-0">
            <select 
              value={selectedDateFilter}
              onChange={(e) => setSelectedDateFilter(e.target.value)}
              className="appearance-none block w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 
                          text-gray-700 dark:text-gray-300 py-3 pl-4 pr-10 rounded-xl shadow-sm 
                          focus:outline-none focus:ring-2 focus:ring-green-400 
                          focus:border-green-400 transition-all duration-200 
                          cursor-pointer text-sm"
            >
              <option>All Dates</option>
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
              <option>Last 3 Months</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-400">
              <CalendarIcon className="h-5 w-5" />
            </div>
          </div>

          <div className="relative group w-full sm:w-auto flex-shrink-0">
            <select 
              value={selectedTagFilter}
              onClick={tagsHandle}
              onChange={(e) => setSelectedTagFilter(e.target.value)}
              className="appearance-none block w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 
                          text-gray-700 dark:text-gray-300 py-3 pl-4 pr-10 rounded-xl shadow-sm
                          focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400
                          transition-all duration-200 cursor-pointer text-sm"
            >
              <option>All Tags</option>
              {tags?.map((tag : NoteTagProps, index) => (
                <option key={index}><TagStyle tag={tag} /></option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-400">
              <TagIcon className="h-5 w-5" />
            </div>
          </div>
          
          <button
            onClick={handleRefresh}
            className="relative flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700
                      text-gray-700 dark:text-gray-300 text-sm font-medium shadow-sm
                      hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <ArrowPathIcon className="h-5 w-5" />
            Refresh
          </button>
        </div>

        <div className="space-y-12">
          {!isLoading && groupNotesByDate(filteredNotes).map(([date, group]) => (
            <DateGroup key={date} date={formatDateLabel(date)} count={group.length}>
              {group.map((note, index) => (
                <NoteCard
                  key={index}
                  note={note}
                  onDelete={handleRefresh}
                />
              ))}
            </DateGroup>
          ))}
          
          {!isLoading && filteredNotes.length === 0 && (
            <div className="text-center p-8 rounded-lg bg-green-50 border border-green-100 max-w-md mx-auto dark:bg-green-900/20 dark:border-green-800/30">
              <p className="text-gray-800 dark:text-gray-200 text-lg font-medium mb-5">
                {allNotes.length === 0 
                  ? "You don't have any notes yet" 
                  : "No notes match your filters"}
              </p>
              <Link 
                to={'create-note'}
                className="inline-block px-5 py-2.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-base font-medium dark:bg-green-700 dark:hover:bg-green-600"
              >
                {allNotes.length === 0 ? "Create Your First Note!" : "Create New Note"}
              </Link>
            </div>
          )}
          
          {isLoading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
            </div>
          )}
        </div>
        <AddNote />
      </div>
    </section>
  );
};

export default Homepage;