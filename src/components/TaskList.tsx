'use client'

import { useState } from 'react'
import { IconCheck, IconTrash, IconClock, IconTag, IconEdit, IconBell } from '@tabler/icons-react'
import type { Task } from '@/hooks/useTasks'

interface TaskListProps {
  tasks: Task[]
  onToggleTask: (id: string) => void
  onDeleteTask: (id: string) => void
  onEditTask: (id: string, updatedTask: Partial<Task>) => void
  onSetReminder: (id: string, reminderDate: string) => void
}

const priorityColors = {
  low: 'bg-green-500',
  medium: 'bg-yellow-500',
  high: 'bg-red-500'
}

export function TaskList({ tasks, onToggleTask, onDeleteTask, onEditTask, onSetReminder }: TaskListProps) {
  const [editingTask, setEditingTask] = useState<string | null>(null)

  const handleEdit = (task: Task) => {
    if (editingTask === task.id) {
      setEditingTask(null)
    } else {
      setEditingTask(task.id)
    }
  }

  const handleUpdate = (task: Task, field: keyof Task, value: any) => {
    onEditTask(task.id, { [field]: value })
  }

  const handleSetReminder = (task: Task) => {
    const reminderDate = prompt('أدخل موعد التذكير:', task.dueDate)
    if (reminderDate) {
      onSetReminder(task.id, reminderDate)
    }
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`bg-dark-card p-4 rounded-xl transition-all ${
            task.completed ? 'opacity-50' : ''
          }`}
        >
          <div className="flex items-start gap-4">
            <button
              onClick={() => onToggleTask(task.id)}
              className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                task.completed
                  ? 'bg-primary border-primary'
                  : 'border-gray-400 hover:border-primary'
              }`}
            >
              {task.completed && <IconCheck className="w-4 h-4 text-white" />}
            </button>

            <div className="flex-1">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  {editingTask === task.id ? (
                    <input
                      type="text"
                      value={task.title}
                      onChange={(e) => handleUpdate(task, 'title', e.target.value)}
                      className="w-full px-2 py-1 bg-dark/50 rounded focus:ring-2 focus:ring-primary outline-none"
                    />
                  ) : (
                    <h3 className={`text-lg font-bold ${task.completed ? 'line-through' : ''}`}>
                      {task.title}
                    </h3>
                  )}
                  {editingTask === task.id ? (
                    <textarea
                      value={task.description}
                      onChange={(e) => handleUpdate(task, 'description', e.target.value)}
                      className="w-full px-2 py-1 bg-dark/50 rounded focus:ring-2 focus:ring-primary outline-none mt-2 resize-none"
                    />
                  ) : (
                    task.description && <p className="text-gray-400 mt-1">{task.description}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(task)}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    <IconEdit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleSetReminder(task)}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    <IconBell className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDeleteTask(task.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <IconTrash className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-4 text-sm">
                {editingTask === task.id ? (
                  <input
                    type="date"
                    value={task.dueDate}
                    onChange={(e) => handleUpdate(task, 'dueDate', e.target.value)}
                    className="px-2 py-1 bg-dark/50 rounded focus:ring-2 focus:ring-primary outline-none"
                  />
                ) : (
                  task.dueDate && (
                    <div className="flex items-center gap-1 text-gray-400">
                      <IconClock className="w-4 h-4" />
                      <span>{new Date(task.dueDate).toLocaleDateString('ar-EG')}</span>
                    </div>
                  )
                )}
                <div className="flex items-center gap-1 text-gray-400">
                  <IconTag className="w-4 h-4" />
                  <span>{task.category}</span>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs text-white ${priorityColors[task.priority]}`}>
                  {task.priority === 'low' && 'منخفضة'}
                  {task.priority === 'medium' && 'متوسطة'}
                  {task.priority === 'high' && 'عالية'}
                </div>
                {task.reminder && (
                  <div className="flex items-center gap-1 text-gray-400">
                    <IconBell className="w-4 h-4" />
                    <span>{new Date(task.reminder).toLocaleDateString('ar-EG')}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 