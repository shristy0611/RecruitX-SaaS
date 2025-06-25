import React, { useState, useEffect } from 'react';
import { Upload, FileText, User, BarChart3, Brain, Download, Settings, Search, TrendingUp, Target, Users, Calendar, ChevronRight, Star, AlertTriangle, CheckCircle, X } from 'lucide-react';

const RecruiterAIApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [analysisStarted, setAnalysisStarted] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [progress, setProgress] = useState(0);

  // Mock data for demonstration
  const mockAnalysis = {
    overallScore: 87,
    candidateName: "田中 太郎 (Tanaka Taro)",
    position: "Senior Software Engineer",
    dimensions: {
      skills: { score: 92, weight: 30, details: "Strong match in React, Node.js, Python" },
      experience: { score: 88, weight: 25, details: "5+ years relevant experience" },
      education: { score: 85, weight: 20, details: "Computer Science degree from top university" },
      cultural: { score: 82, weight: 15, details: "JLPT N2 certified, 2 years in Japan" },
      location: { score: 90, weight: 10, details: "Located in Tokyo, available immediately" }
    }
  };

  useEffect(() => {
    if (analysisStarted && !analysisComplete) {
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setAnalysisComplete(true);
            clearInterval(timer);
            return 100;
          }
          return prev + 2;
        });
      }, 100);
      return () => clearInterval(timer);
    }
  }, [analysisStarted, analysisComplete]);

  const startAnalysis = () => {
    setAnalysisStarted(true);
    setProgress(0);
  };

  const viewReport = () => {
    setShowReport(true);
    setActiveTab('report');
  };

  const ScoreCircle = ({ score, size = 120 }) => (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size/2}
          cy={size/2}
          r={size/2 - 10}
          stroke="rgb(229, 231, 235)"
          strokeWidth="8"
          fill="transparent"
        />
        <circle
          cx={size/2}
          cy={size/2}
          r={size/2 - 10}
          stroke="url(#gradient)"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={`${2 * Math.PI * (size/2 - 10)}`}
          strokeDashoffset={`${2 * Math.PI * (size/2 - 10) * (1 - score/100)}`}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl font-bold text-gray-800">{score}%</span>
      </div>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
    </div>
  );

  const DimensionBar = ({ label, score, weight, details }) => (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-gray-800">{label}</span>
        <span className="text-sm text-gray-500">Weight: {weight}%</span>
      </div>
      <div className="flex items-center space-x-3 mb-2">
        <div className="flex-1 bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${score}%` }}
          />
        </div>
        <span className="font-semibold text-gray-800 min-w-[3rem]">{score}%</span>
      </div>
      <p className="text-sm text-gray-600">{details}</p>
    </div>
  );

  if (showReport) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setShowReport(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI Analysis Report
                </h1>
              </div>
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* Report Content */}
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Executive Summary */}
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Executive Summary</h2>
                <p className="text-gray-600">Overall assessment for {mockAnalysis.candidateName}</p>
              </div>
              <div className="text-center">
                <ScoreCircle score={mockAnalysis.overallScore} size={100} />
                <p className="text-sm text-gray-600 mt-2">Match Score</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">Strong Match</p>
                  <p className="text-sm text-green-600">Recommended for interview</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <Star className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-800">Top Skills Match</p>
                  <p className="text-sm text-blue-600">92% technical alignment</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="font-medium text-orange-800">Cultural Adaptation</p>
                  <p className="text-sm text-orange-600">Needs assessment</p>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Analysis */}
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Dimensional Analysis</h3>
            <div className="space-y-4">
              {Object.entries(mockAnalysis.dimensions).map(([key, value]) => (
                <DimensionBar 
                  key={key}
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  score={value.score}
                  weight={value.weight}
                  details={value.details}
                />
              ))}
            </div>
          </div>

          {/* Interview Recommendations */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Interview Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Key Questions to Ask</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Describe your experience with microservices architecture</li>
                  <li>• How do you handle cultural differences in team collaboration?</li>
                  <li>• Walk me through your approach to code review processes</li>
                  <li>• What challenges have you faced working in agile environments?</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Areas to Explore</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Leadership experience and team management skills</li>
                  <li>• Adaptation to Japanese business practices</li>
                  <li>• Long-term career goals and commitment to Japan</li>
                  <li>• Experience with remote work and hybrid environments</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
      </div>

      {/* Header */}
      <div className="relative bg-white/80 backdrop-blur-sm shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Brain className="w-8 h-8 text-blue-600" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  RecruiterAI Pro
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>AI Ready</span>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 relative">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-white/80 backdrop-blur-sm p-1 rounded-xl mb-8 shadow-sm">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'upload', label: 'New Analysis', icon: Upload },
            { id: 'results', label: 'Results', icon: Target }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
                activeTab === tab.id 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Analyses Today', value: '24', icon: TrendingUp, color: 'blue' },
                { label: 'Match Rate', value: '87%', icon: Target, color: 'green' },
                { label: 'Active Jobs', value: '156', icon: FileText, color: 'purple' },
                { label: 'Candidates', value: '2.1k', icon: Users, color: 'orange' }
              ].map((stat, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                    </div>
                    <div className={`p-3 bg-${stat.color}-100 rounded-lg`}>
                      <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Analyses</h3>
              <div className="space-y-3">
                {[
                  { candidate: '佐藤 花子', position: 'UX Designer', score: 92, time: '5 min ago' },
                  { candidate: '山田 次郎', position: 'DevOps Engineer', score: 78, time: '1 hour ago' },
                  { candidate: '鈴木 美咲', position: 'Product Manager', score: 85, time: '2 hours ago' }
                ].map((analysis, index) => (
                  <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                        {analysis.candidate.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{analysis.candidate}</p>
                        <p className="text-sm text-gray-600">{analysis.position}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        analysis.score >= 85 ? 'bg-green-100 text-green-800' : 
                        analysis.score >= 70 ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {analysis.score}%
                      </span>
                      <span className="text-sm text-gray-500">{analysis.time}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* CV Upload */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Upload CV
                </h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Drag & drop CV here, or click to browse</p>
                  <p className="text-sm text-gray-500">Supports PDF, DOC, DOCX</p>
                  <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
                </div>
              </div>

              {/* JD Upload */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Upload Job Description
                </h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Drag & drop JD here, or click to browse</p>
                  <p className="text-sm text-gray-500">Supports PDF, DOC, DOCX, TXT</p>
                  <input type="file" className="hidden" accept=".pdf,.doc,.docx,.txt" />
                </div>
              </div>
            </div>

            {/* Analysis Settings */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Analysis Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Industry Focus</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Technology</option>
                    <option>Finance</option>
                    <option>Healthcare</option>
                    <option>Manufacturing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Senior (5+ years)</option>
                    <option>Mid-level (2-5 years)</option>
                    <option>Junior (0-2 years)</option>
                    <option>Executive (10+ years)</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6">
                <button 
                  onClick={startAnalysis}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  Start AI Analysis
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results Tab */}
        {activeTab === 'results' && (
          <div className="space-y-6">
            {!analysisStarted ? (
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border p-12 text-center">
                <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">No Analysis Yet</h3>
                <p className="text-gray-600 mb-6">Upload CV and JD to start your first analysis</p>
                <button 
                  onClick={() => setActiveTab('upload')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Start Analysis
                </button>
              </div>
            ) : !analysisComplete ? (
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border p-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <Brain className="w-8 h-8 text-blue-600 animate-pulse" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">AI Analysis in Progress</h3>
                  <p className="text-gray-600 mb-6">Processing CV and JD with advanced matching algorithms</p>
                  
                  <div className="max-w-md mx-auto">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6 text-sm text-gray-500">
                    <p>🧠 Extracting skills and experience...</p>
                    <p>📊 Calculating compatibility scores...</p>
                    <p>📝 Generating detailed report...</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Analysis Results */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">Analysis Complete</h3>
                      <p className="text-gray-600">Candidate: {mockAnalysis.candidateName}</p>
                      <p className="text-gray-600">Position: {mockAnalysis.position}</p>
                    </div>
                    <div className="text-center">
                      <ScoreCircle score={mockAnalysis.overallScore} />
                      <p className="text-sm text-gray-600 mt-2">Overall Match</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {Object.entries(mockAnalysis.dimensions).map(([key, value]) => (
                      <div key={key} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-800 capitalize">{key}</span>
                          <span className="text-lg font-bold text-blue-600">{value.score}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${value.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex space-x-4">
                    <button 
                      onClick={viewReport}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all"
                    >
                      View Detailed Report
                    </button>
                    <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      <Download className="w-4 h-4 inline mr-2" />
                      Export
                    </button>
                    <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Schedule
                    </button>
                  </div>
                </div>

                {/* Quick Insights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <div className="flex items-center mb-3">
                      <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                      <h4 className="font-bold text-green-800">Strengths</h4>
                    </div>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Excellent technical skills match</li>
                      <li>• Strong educational background</li>
                      <li>• Relevant industry experience</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                    <div className="flex items-center mb-3">
                      <AlertTriangle className="w-6 h-6 text-orange-600 mr-2" />
                      <h4 className="font-bold text-orange-800">Areas to Explore</h4>
                    </div>
                    <ul className="text-sm text-orange-700 space-y-1">
                      <li>• Cultural adaptation to Japan</li>
                      <li>• Leadership experience depth</li>
                      <li>• Long-term commitment goals</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <div className="flex items-center mb-3">
                      <Brain className="w-6 h-6 text-blue-600 mr-2" />
                      <h4 className="font-bold text-blue-800">AI Recommendation</h4>
                    </div>
                    <p className="text-sm text-blue-700">
                      <strong>Proceed to interview.</strong> High technical alignment with some cultural fit questions to address.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterAIApp;