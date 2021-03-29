export default function Header() {
    return (
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img className="h-8 w-8" src="/bean.png" alt="Workflow"/>
              </div>
              <div className="px-4 mx-auto py-2 text-white font-medium font-bold">
                Bean Machine
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-1">
                  {/* <a className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">Current State</a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }