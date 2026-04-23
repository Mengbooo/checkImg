import Header from './components/Header'
import ImageUploader from './components/ImageUploader'
import ResultDisplay from './components/ResultDisplay'
import { useState } from 'react'

function App() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleImageSelect = async (file) => {
    setLoading(true)
    // TODO: 实现 C2PA 解析
    setLoading(false)
  }

  return (
    <div className="app">
      <div className="container">
        <Header />
        <ImageUploader onImageSelect={handleImageSelect} />
        <ResultDisplay result={result} loading={loading} />
      </div>
    </div>
  )
}

export default App
