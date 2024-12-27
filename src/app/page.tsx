'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { IconArrowRight } from '@tabler/icons-react'
import { useTasks } from '@/hooks/useTasks'

const AddTaskForm = dynamic(() => import('@/components/AddTaskForm').then(mod => mod.AddTaskForm), { ssr: false })
const TaskList = dynamic(() => import('@/components/TaskList').then(mod => mod.TaskList), { ssr: false })
const SearchBar = dynamic(() => import('@/components/SearchBar').then(mod => mod.SearchBar), { ssr: false })

const categories = [
  'شخصي',
  'عمل',
  'تسوق',
  'دراسة',
  'صحة',
  'أخرى'
]

export default function Home() {
  const {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    setReminder,
    getTaskStats,
    sortTasks
  } = useTasks()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'completed'>('all')
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority' | 'createdAt'>('createdAt')

  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission()
    }
  }, [])

  const stats = getTaskStats()
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || task.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' ||
      (selectedStatus === 'active' && !task.completed) ||
      (selectedStatus === 'completed' && task.completed)

    return matchesSearch && matchesCategory && matchesStatus
  })

  const sortedTasks = sortTasks(filteredTasks, sortBy)

  return (
    <main className="min-h-screen bg-dark text-light py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              <IconArrowRight className="w-6 h-6" />
            </Link>
            <Image src="/images/logo.svg" alt="Logo" width={40} height={40} className="animate-bounce-slow" />
            <h1 className="text-3xl font-bold gradient-text">مهامي</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
              أ
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8">
          <div className="space-y-8">
            <AddTaskForm onAddTask={addTask} />
            
            <div className="bg-dark-card p-4 rounded-xl">
              <h2 className="text-xl font-bold mb-4">إحصائيات</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-dark/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold gradient-text">{stats.total}</div>
                  <div className="text-gray-400">إجمالي المهام</div>
                </div>
                <div className="bg-dark/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold gradient-text">{stats.completed}</div>
                  <div className="text-gray-400">المهام المكتملة</div>
                </div>
                <div className="bg-dark/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold gradient-text">{stats.active}</div>
                  <div className="text-gray-400">المهام النشطة</div>
                </div>
                <div className="bg-dark/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold gradient-text">{stats.overdue}</div>
                  <div className="text-gray-400">المهام المتأخرة</div>
                </div>
                <div className="col-span-2 bg-dark/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">نسبة الإنجاز</span>
                    <span className="text-primary">{stats.completionRate}%</span>
                  </div>
                  <div className="w-full bg-dark rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2 transition-all"
                      style={{ width: `${stats.completionRate}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              categories={categories}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />

            <TaskList
              tasks={sortedTasks}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
              onEditTask={editTask}
              onSetReminder={setReminder}
            />

            {sortedTasks.length === 0 && (
              <div className="text-center text-gray-400 py-12">
                لا توجد مهام متطابقة مع البحث
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
