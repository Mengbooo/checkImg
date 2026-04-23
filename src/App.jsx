import Header from './components/Header'
import ImageUploader from './components/ImageUploader'
import ResultDisplay from './components/ResultDisplay'
import { useC2PA } from './hooks/useC2PA'

function App() {
  const { loading, result, error, analyzeImage } = useC2PA()

  const handleImageSelect = async (file) => {
    await analyzeImage(file)
  }

  return (
    <div className="app">
      <div className="container">
        <Header />
        <ImageUploader onImageSelect={handleImageSelect} />
        <ResultDisplay result={result} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default App