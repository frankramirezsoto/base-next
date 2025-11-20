export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Products
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Your product catalog will go here. Add your products and start selling!
          </p>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Example Product Card */}
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-lg">Product Image</span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Sample Product {item}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    This is a placeholder for your product description. Add your own products here.
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">
                      $99.00
                    </span>
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
