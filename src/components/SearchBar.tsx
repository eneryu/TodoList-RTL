'use client'

import { IconSearch, IconFilter, IconSortAscending } from '@tabler/icons-react'

interface SearchBarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedCategory: string
  onCategoryChange: (category: string) => void
  selectedStatus: 'all' | 'active' | 'completed'
  onStatusChange: (status: 'all' | 'active' | 'completed') => void
  categories: string[]
  sortBy: 'dueDate' | 'priority' | 'createdAt'
  onSortChange: (sort: 'dueDate' | 'priority' | 'createdAt') => void
}

export function SearchBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  categories,
  sortBy,
  onSortChange
}: SearchBarProps) {
  return (
    <div className="bg-dark-card p-4 rounded-xl space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <IconSearch className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="ابحث عن مهمة..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-3 bg-dark/50 rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all pr-10"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <IconFilter className="w-5 h-5 text-gray-400" />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full px-4 py-2 bg-dark/50 rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all pr-10 appearance-none"
            >
              <option value="">كل التصنيفات</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <IconSortAscending className="w-5 h-5 text-gray-400" />
            </div>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as 'dueDate' | 'priority' | 'createdAt')}
              className="w-full px-4 py-2 bg-dark/50 rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all pr-10 appearance-none"
            >
              <option value="createdAt">الأحدث</option>
              <option value="dueDate">تاريخ الاستحقاق</option>
              <option value="priority">الأولوية</option>
            </select>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onStatusChange('all')}
            className={`px-4 py-2 rounded-lg transition-all flex-1 ${
              selectedStatus === 'all'
                ? 'bg-primary text-white'
                : 'bg-dark/50 hover:bg-dark/70'
            }`}
          >
            الكل
          </button>
          <button
            onClick={() => onStatusChange('active')}
            className={`px-4 py-2 rounded-lg transition-all flex-1 ${
              selectedStatus === 'active'
                ? 'bg-primary text-white'
                : 'bg-dark/50 hover:bg-dark/70'
            }`}
          >
            نشط
          </button>
          <button
            onClick={() => onStatusChange('completed')}
            className={`px-4 py-2 rounded-lg transition-all flex-1 ${
              selectedStatus === 'completed'
                ? 'bg-primary text-white'
                : 'bg-dark/50 hover:bg-dark/70'
            }`}
          >
            مكتمل
          </button>
        </div>
      </div>
    </div>
  )
} 