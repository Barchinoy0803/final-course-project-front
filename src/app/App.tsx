import AppProvider from "./provider"
import AppRouter from "./router"
import Suspense from "@/shared/components/fallback/SuspenseContainer";

const App = () => {
  return (
    <AppProvider>
      <Suspense>
        <AppRouter/>
      </Suspense>
    </AppProvider>
  )
}

export default App