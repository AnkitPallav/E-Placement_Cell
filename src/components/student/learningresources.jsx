import React, { useState, useEffect } from 'react';
import {
  Building2, Users, FileText, Trash2, Edit, Plus,
  AlertTriangle, X, BookOpen, Briefcase, Server, Search,
  Database, Calendar, MapPin, DollarSign, Award, Star, Filter, Play, FileSymlink, Download, ExternalLink
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../admin/UIComponents';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../admin/UIComponents';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../admin/UIComponents';
import Sidebar from './Sidebar';

// Initial learning resources data
const initialResources = [
  {
    id: 1,
    type: "video",
    title: "My Experience at Google as SDE Intern",
    company: "Google",
    author: "Priya Sharma",
    batch: "2020-24",
    technologies: ["React", "Node.js", "Cloud"],
    description: "A detailed walkthrough of my internship experience including interview process and projects.",
    link: "https://youtube.com/watch?v=example1",
    date: "2023-09-15",
    rating: 5
  },
  {
    id: 2,
    type: "document",
    title: "Amazon Interview Preparation Guide",
    company: "Amazon",
    author: "Rahul Patel",
    batch: "2021-25",
    technologies: ["Java", "Data Structures", "System Design"],
    description: "Comprehensive guide to crack Amazon's technical interviews.",
    link: "https://docs.example.com/amazon-prep",
    date: "2023-08-10",
    rating: 4
  },
  {
    id: 3,
    type: "video",
    title: "Day in the Life: Microsoft Software Engineer",
    company: "Microsoft",
    author: "Aditya Kumar",
    batch: "2019-23",
    technologies: ["C#", ".NET", "Azure"],
    description: "Vlog showing what a typical day looks like as a new grad at Microsoft.",
    link: "https://youtube.com/watch?v=example2",
    date: "2023-07-22",
    rating: 5
  },
  {
    id: 4,
    type: "document",
    title: "Adobe Frontend Interview Questions",
    company: "Adobe",
    author: "Sneha Gupta",
    batch: "2020-24",
    technologies: ["JavaScript", "CSS", "React"],
    description: "Collection of frontend questions asked in Adobe interviews.",
    link: "https://docs.example.com/adobe-frontend",
    date: "2023-10-05",
    rating: 4
  },
  {
    id: 5,
    type: "video",
    title: "How I Got Into IBM - Full Process Explained",
    company: "IBM",
    author: "Arjun Singh",
    batch: "2021-25",
    technologies: ["Python", "AI/ML", "Cloud"],
    description: "Complete journey from application to offer letter at IBM.",
    link: "https://youtube.com/watch?v=example3",
    date: "2023-06-15",
    rating: 5
  },
  {
    id: 6,
    type: "document",
    title: "Flipkart SDE Role: What to Expect",
    company: "Flipkart",
    author: "Vikram Reddy",
    batch: "2019-23",
    technologies: ["Java", "Spring Boot", "Microservices"],
    description: "An insider's perspective on working at Flipkart and the tech stack used.",
    link: "https://docs.example.com/flipkart-sde",
    date: "2023-11-02",
    rating: 4
  }
];

// List of technologies for filtering
const allTechnologies = [
  "React", "Angular", "Vue.js", "JavaScript", "TypeScript", "HTML/CSS",
  "Node.js", "Express", "Java", "Spring Boot", "Python", "Django", "Flask",
  "C#", ".NET", "PHP", "Ruby", "Go", "Swift", "Kotlin", "C++",
  "AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD",
  "MongoDB", "MySQL", "PostgreSQL", "Oracle", "SQL Server", "Redis",
  "Data Structures", "Algorithms", "System Design", "Microservices",
  "AI/ML", "Data Science", "Blockchain", "IoT", "Mobile Dev", "DevOps", "Cloud"
];

// Common companies for filtering
const popularCompanies = [
  "Google", "Microsoft", "Amazon", "Apple", "Facebook", "Netflix", "Adobe",
  "IBM", "Oracle", "Salesforce", "Uber", "Twitter", "LinkedIn", "Airbnb",
  "Flipkart", "Walmart", "Goldman Sachs", "JPMorgan Chase", "Morgan Stanley",
  "Deloitte", "Accenture", "Infosys", "TCS", "Wipro", "HCL"
];

// Generic resources (non-student experiences)
const genericResources = [
  {
    id: 101,
    type: "link",
    title: "LeetCode Problems for Placements",
    description: "A curated list of must-solve LeetCode problems for placement preparation.",
    link: "https://leetcode.com/problemset/",
    category: "Interview Prep"
  },
  {
    id: 102,
    type: "link",
    title: "System Design Primer",
    description: "Learn how to design large-scale systems for your interviews.",
    link: "https://github.com/donnemartin/system-design-primer",
    category: "System Design"
  },
  {
    id: 103,
    type: "link",
    title: "Resume Building Workshop",
    description: "Free workshop on crafting an ATS-friendly tech resume.",
    link: "https://example.com/resume-workshop",
    category: "Career Development"
  },
  {
    id: 104,
    type: "link",
    title: "Cracking the Coding Interview",
    description: "Classic book for technical interview preparation.",
    link: "https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/0984782850",
    category: "Interview Prep"
  },
  {
    id: 105,
    type: "link",
    title: "Best Practices for Technical Interviews",
    description: "Guidance on how to approach technical interviews effectively.",
    link: "https://example.com/tech-interview-best-practices",
    category: "Interview Prep"
  }
];

// Alert Component
const Alert = ({ children, variant = 'success', onClose }) => {
  const bgColor = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800'
  }[variant];

  return (
    <div className={`fixed bottom-4 right-4 w-96 p-4 rounded-lg border ${bgColor} shadow-lg animate-slide-up z-50`}>
      <div className="flex items-start gap-3">
        {variant === 'success' ? (
          <Star className="h-5 w-5 mt-0.5" />
        ) : variant === 'error' ? (
          <AlertTriangle className="h-5 w-5 mt-0.5" />
        ) : (
          <AlertTriangle className="h-5 w-5 mt-0.5" />
        )}
        <div className="flex-1">{children}</div>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

// Resource Card Component
const ResourceCard = ({ resource, onEdit, onDelete }) => {
  const getIcon = () => {
    switch (resource.type) {
      case 'video':
        return <Play className="h-5 w-5 text-red-500" />;
      case 'document':
        return <FileSymlink className="h-5 w-5 text-blue-500" />;
      default:
        return <ExternalLink className="h-5 w-5 text-purple-500" />;
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-gray-100 rounded-full">
              {getIcon()}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{resource.title}</h3>
              <div className="flex items-center mt-1 space-x-2">
                {resource.company && (
                  <span className="flex items-center text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    <Building2 className="h-3 w-3 mr-1" />
                    {resource.company}
                  </span>
                )}
                {resource.author && (
                  <span className="flex items-center text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    <Users className="h-3 w-3 mr-1" />
                    {resource.author}
                  </span>
                )}
                {resource.type && (
                  <span className="flex items-center text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                    {resource.type === 'video' ? <Play className="h-3 w-3 mr-1" /> : <FileSymlink className="h-3 w-3 mr-1" />}
                    {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                  </span>
                )}
              </div>
              {resource.technologies && resource.technologies.length > 0 && (
                <div className="flex flex-wrap mt-2">
                  {resource.technologies.map((tech, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded mr-1 mb-1">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              <p className="text-sm text-gray-600 mt-2">{resource.description}</p>
              {resource.rating && (
                <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < resource.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
              )}
              <div className="mt-2">
                <a 
                  href={resource.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center"
                >
                  {resource.type === 'video' ? 'Watch Video' : 'View Resource'}
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            {onEdit && (
              <button
                onClick={() => onEdit(resource)}
                className="p-1 text-gray-600 hover:bg-gray-100 rounded"
              >
                <Edit className="h-4 w-4" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(resource)}
                className="p-1 text-red-600 hover:bg-red-100 rounded"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Delete Confirmation Modal
const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex items-center justify-center mb-4">
          <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
        </div>
        
        <h2 className="text-lg font-semibold text-center mb-2">{title}</h2>
        <p className="text-sm text-gray-500 text-center mb-6">{message}</p>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// Resource Modal Component
const ResourceModal = ({ isOpen, onClose, onSave, resource = null }) => {
  const [formData, setFormData] = useState(
    resource || {
      title: '',
      type: 'video',
      company: '',
      author: '',
      batch: '',
      technologies: [],
      description: '',
      link: '',
      rating: 5
    }
  );

  const [techInput, setTechInput] = useState('');
  
  useEffect(() => {
    if (resource) {
      setFormData(resource);
    } else {
      setFormData({
        title: '',
        type: 'video',
        company: '',
        author: '',
        batch: '',
        technologies: [],
        description: '',
        link: '',
        rating: 5
      });
    }
    setTechInput('');
  }, [resource, isOpen]);

  const handleAddTechnology = () => {
    if (techInput && !formData.technologies.includes(techInput)) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, techInput]
      });
      setTechInput('');
    }
  };

  const handleRemoveTechnology = (tech) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter(t => t !== tech)
    });
  };

  const handleTechSelect = (tech) => {
    if (!formData.technologies.includes(tech)) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, tech]
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {resource ? 'Edit Resource' : 'Add New Learning Resource'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          onSave({ ...formData, id: resource?.id || Date.now(), date: resource?.date || new Date().toISOString().split('T')[0] });
        }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input
              type="text"
              required
              className="w-full p-2 border rounded"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Enter resource title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Resource Type *</label>
            <select
              required
              className="w-full p-2 border rounded"
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
            >
              <option value="video">Video</option>
              <option value="document">Document</option>
              <option value="link">Link</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Company</label>
              <input
                type="text"
                list="companies"
                className="w-full p-2 border rounded"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                placeholder="Enter company name"
              />
              <datalist id="companies">
                {popularCompanies.map(company => (
                  <option key={company} value={company} />
                ))}
              </datalist>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Author Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.author}
                onChange={(e) => setFormData({...formData, author: e.target.value})}
                placeholder="Enter your name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Batch</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={formData.batch}
              onChange={(e) => setFormData({...formData, batch: e.target.value})}
              placeholder="e.g. 2021-25"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Technologies</label>
            <div className="flex">
              <input
                type="text"
                list="technologies"
                className="flex-1 p-2 border rounded-l"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="Add technologies used"
              />
              <button
                type="button"
                onClick={handleAddTechnology}
                className="px-4 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            <datalist id="technologies">
              {allTechnologies.map(tech => (
                <option key={tech} value={tech} />
              ))}
            </datalist>
            
            <div className="mt-2">
              <p className="text-sm text-gray-500 mb-1">Common technologies:</p>
              <div className="flex flex-wrap gap-1">
                {["React", "Java", "Python", "JavaScript", "Cloud", "System Design"].map(tech => (
                  <button
                    key={tech}
                    type="button"
                    onClick={() => handleTechSelect(tech)}
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>
            
            {formData.technologies.length > 0 && (
              <div className="flex flex-wrap mt-2 gap-1">
                {formData.technologies.map((tech, index) => (
                  <span key={index} className="flex items-center text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {tech}
                    <button
                      type="button"
                      onClick={() => handleRemoveTechnology(tech)}
                      className="ml-1 text-blue-800 hover:text-blue-900"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Resource Link *</label>
            <input
              type="url"
              required
              className="w-full p-2 border rounded"
              value={formData.link}
              onChange={(e) => setFormData({...formData, link: e.target.value})}
              placeholder="https://..."
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.type === 'video' ? 'YouTube, Vimeo or other video link' : 
               formData.type === 'document' ? 'Google Drive, Dropbox or other document link' : 
               'Website or other resource link'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description *</label>
            <textarea
              required
              className="w-full p-2 border rounded"
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe this resource..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Rating</label>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setFormData({...formData, rating: i + 1})}
                  className="p-1 focus:outline-none"
                >
                  <Star 
                    className={`h-6 w-6 ${i < formData.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {resource ? 'Update Resource' : 'Add Resource'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Stats Overview Component
const StatsOverview = ({ resources }) => {
  const stats = {
    totalResources: resources.length,
    totalVideos: resources.filter(r => r.type === 'video').length,
    totalDocuments: resources.filter(r => r.type === 'document').length,
    totalCompanies: new Set(resources.map(r => r.company)).size
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Resources</p>
              <p className="text-2xl font-bold">{stats.totalResources}</p>
            </div>
            <BookOpen className="h-8 w-8 text-blue-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Videos</p>
              <p className="text-2xl font-bold">{stats.totalVideos}</p>
            </div>
            <Play className="h-8 w-8 text-red-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Documents</p>
              <p className="text-2xl font-bold">{stats.totalDocuments}</p>
            </div>
            <FileText className="h-8 w-8 text-purple-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Companies</p>
              <p className="text-2xl font-bold">{stats.totalCompanies}</p>
            </div>
            <Building2 className="h-8 w-8 text-green-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const LearningResources = () => {
  const [resources, setResources] = useState(initialResources);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCompany, setFilterCompany] = useState('');
  const [filterTechnology, setFilterTechnology] = useState('');
  const [filterType, setFilterType] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [showGenericResources, setShowGenericResources] = useState(true);

  const handleAddResource = (newResource) => {
    setResources([...resources, newResource]);
    setIsAddModalOpen(false);
    showNotification('New learning resource added successfully');
  };

  const handleEditResource = (updatedResource) => {
    setResources(resources.map(resource => 
      resource.id === updatedResource.id ? updatedResource : resource
    ));
    setIsEditModalOpen(false);
    setSelectedResource(null);
    showNotification('Resource updated successfully');
  };

  const handleDeleteResource = () => {
    setResources(resources.filter(resource => resource.id !== selectedResource.id));
    setIsDeleteModalOpen(false);
    setSelectedResource(null);
    showNotification('Resource deleted successfully');
  };

  const showNotification = (message, variant = 'success') => {
    const newNotification = {
      id: Date.now(),
      message,
      variant
    };
    setNotifications(prev => [...prev, newNotification]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  };

  // Filter resources based on search and filters
  const filteredResources = resources.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (resource.author && resource.author.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (resource.company && resource.company.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCompany = !filterCompany || (resource.company && resource.company === filterCompany);
    const matchesTechnology = !filterTechnology || (resource.technologies && resource.technologies.includes(filterTechnology));
    const matchesType = !filterType || resource.type === filterType;
    
    return matchesSearch && matchesCompany && matchesTechnology && matchesType;
  });

  // Get unique companies and technologies for filters
  const uniqueCompanies = [...new Set(resources.map(r => r.company).filter(Boolean))].sort();
  const uniqueTechnologies = [...new Set(resources.flatMap(r => r.technologies || []))].sort();

  return (
    <div className="flex">
      <Sidebar />
      <div className="min-h-screen w-full bg-gray-50">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Learning Resources</h1>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="h-5 w-5" />
              <span>Add Experience</span>
            </button>
          </div>

          <StatsOverview resources={resources} />

          <div className="mb-6">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources by title, description, author or company..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Resource Type</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="">All Types</option>
                  <option value="video">Videos</option>
                  <option value="document">Documents</option>
                  <option value="link">Links</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Company</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={filterCompany}
                  onChange={(e) => setFilterCompany(e.target.value)}
                >
                  <option value="">All Companies</option>
                  {uniqueCompanies.map(company => (
                    <option key={company} value={company}>{company}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Technology</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={filterTechnology}
                  onChange={(e) => setFilterTechnology(e.target.value)}
                >
                  <option value="">All Technologies</option>
                  {uniqueTechnologies.map(tech => (
                    <option key={tech} value={tech}>{tech}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterCompany('');
                    setFilterTechnology('');
                    setFilterType('');
                  }}
                  className="flex items-center space-x-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  <Filter className="h-4 w-4" />
                  <span>Clear Filters</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Student Experiences</h2>
              <div className="text-sm text-gray-500">
                {filteredResources.length} resources found
              </div>
            </div>

            {filteredResources.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {filteredResources.map(resource => (
                  <ResourceCard
                    key={resource.id}
                    resource={resource}
                    onEdit={(resource) => {
                      setSelectedResource(resource);
                      setIsEditModalOpen(true);
                    }}
                    onDelete={(resource) => {
                      setSelectedResource(resource);
                      setIsDeleteModalOpen(true);
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
                <div className="flex justify-center mb-4">
                  <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">No resources found</h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your search or filter criteria to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterCompany('');
                    setFilterTechnology('');
                    setFilterType('');
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {showGenericResources && (
            <div className="mb-8">
              <Accordion type="single" collapsible defaultValue="item-1">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                      <h2 className="text-lg font-semibold">General Resources</h2>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                      {genericResources.map(resource => (
                        <div 
                          key={resource.id} 
                          className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start space-x-3">
                            <div className="p-2 bg-gray-100 rounded-full">
                              <ExternalLink className="h-5 w-5 text-purple-500" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{resource.title}</h3>
                              <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                              <div className="flex mt-2">
                                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                                  {resource.category}
                                </span>
                              </div>
                              <div className="mt-3">
                                <a 
                                  href={resource.link} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center"
                                >
                                  View Resource
                                  <ExternalLink className="h-3 w-3 ml-1" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <ResourceModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddResource}
      />
      
      <ResourceModal 
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedResource(null);
        }}
        onSave={handleEditResource}
        resource={selectedResource}
      />
      
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedResource(null);
        }}
        onConfirm={handleDeleteResource}
        title="Delete Resource"
        message="Are you sure you want to delete this resource? This action cannot be undone."
      />

      {/* Notifications */}
      {notifications.map(notification => (
        <Alert 
          key={notification.id} 
          variant={notification.variant} 
          onClose={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
        >
          {notification.message}
        </Alert>
      ))}
    </div>
  );
};

export default LearningResources;