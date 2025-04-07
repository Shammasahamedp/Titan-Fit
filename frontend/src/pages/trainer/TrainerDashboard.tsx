
const TrainerDashboard = () => {
  
  return (
   
    <div className="flex flex-col min-h-screen">
    <header className="bg-gray-800 text-white p-4">
      <h1>Navbar</h1>
    </header>
  
    <div className="flex flex-1">
      <aside className="bg-gray-700 text-white w-64 p-4">
        <h2>Sidebar</h2>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </aside>
  
      <main className="flex-1 p-6">
        <h2>Main Content</h2>
        <p>This is the main content area.</p>
      </main>
    </div>
  </div>
  

  )
}

export default TrainerDashboard
