'use client'

import { useState } from 'react'
import { IconPlus, IconCalendar, IconTag } from '@tabler/icons-react'

interface TaskFormData {
  title: string
  description: string
  dueDate: string
  category: string
  priority: 'low' | 'medium' | 'high'
}

interface AddTaskFormProps {
  onAddTask: (task: TaskFormData) => void
}

const categories = [
  'شخصي',
  'عمل',
  'تسوق',
  'دراسة',
  'صحة',
  'أخرى'
]

const priorities = [
  { value: 'low', label: 'منخفضة', color: 'bg-green-500' },
  { value: 'medium', label: 'متوسطة', color: 'bg-yellow-500' },
  { value: 'high', label: 'عالية', color: 'bg-red-500' }
]

export function AddTaskForm({ onAddTask }: AddTaskFormProps) {
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    dueDate: '',
    category: categories[0],
    priority: 'medium'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddTask(formData)
    setFormData({
      title: '',
      description: '',
      dueDate: '',
      category: categories[0],
      priority: 'medium'
    })
  }

  return (
    <div className="bg-dark-card rounded-xl overflow-hidden">
      <div className="p-4 border-b border-dark/10">
        <h2 className="text-xl font-bold">إضافة مهمة جديدة</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">عنوان المهمة</label>
          <input
            type="text"
            placeholder="أدخل عنوان المهمة"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 bg-dark/50 rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">وصف المهمة</label>
          <textarea
            placeholder="أدخل وصف المهمة"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 bg-dark/50 rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all resize-none h-24"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">تاريخ الاستحقاق</label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <IconCalendar className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full px-4 py-2 bg-dark/50 rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all pr-10"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">التصنيف</label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <IconTag className="w-5 h-5 text-gray-400" />
              </div>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 bg-dark/50 rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all pr-10 appearance-none"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">الأولوية</label>
          <div className="flex gap-2">
            {priorities.map((priority) => (
              <button
                key={priority.value}
                type="button"
                onClick={() => setFormData({ ...formData, priority: priority.value as TaskFormData['priority'] })}
                className={`flex-1 px-4 py-2 rounded-lg transition-all ${
                  formData.priority === priority.value
                    ? `${priority.color} text-white`
                    : 'bg-dark/50 hover:bg-dark/70'
                }`}
              >
                {priority.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-primary hover:bg-accent text-white font-bold py-3 px-6 rounded-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
        >
          <IconPlus className="w-5 h-5" />
          إضافة مهمة
        </button>
      </form>
    </div>
  )
} 