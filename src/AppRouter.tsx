import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router'
import { MotionConfig } from 'motion/react'
import { SymphoniaThemeProvider } from './symphonia/theme/SymphoniaThemeProvider'
import { defaultTheme } from './symphonia/theme/defaultTheme'
import { SiteChrome } from './symphonia/app/components/SiteChrome'
import { HomePage } from './symphonia/app/pages/HomePage'
import { ExamplesPage } from './symphonia/app/pages/ExamplesPage'
import { PatternPage } from './symphonia/app/pages/PatternPage'
import { CollectionPage } from './symphonia/app/pages/CollectionPage'
import { StylesPage } from './symphonia/app/pages/StylesPage'
import { UsePage } from './symphonia/app/pages/UsePage'
import { AboutPage } from './symphonia/app/pages/AboutPage'
import { NotFoundPage } from './symphonia/app/pages/NotFoundPage'

const LegacyShell = lazy(() => import('./legacy'))

function SymphoniaLayout() {
  return (
    <SymphoniaThemeProvider theme={defaultTheme}>
      <MotionConfig reducedMotion="user">
        <SiteChrome>
          <Outlet />
        </SiteChrome>
      </MotionConfig>
    </SymphoniaThemeProvider>
  )
}

function LegacyFallback() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Inter', arial, sans-serif", color: '#654922',
    }}>
      Loading build 1…
    </div>
  )
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/build1/*"
          element={
            <Suspense fallback={<LegacyFallback />}>
              <LegacyShell />
            </Suspense>
          }
        />

        <Route path="/" element={<SymphoniaLayout />}>
          <Route index element={<HomePage />} />
          <Route path="examples" element={<ExamplesPage />} />
          <Route path="examples/:patternId" element={<PatternPage />} />
          <Route path="collections/:collectionId" element={<CollectionPage />} />
          <Route path="styles" element={<StylesPage />} />
          <Route path="styles/:styleId" element={<StylesPage />} />
          <Route path="use" element={<UsePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
