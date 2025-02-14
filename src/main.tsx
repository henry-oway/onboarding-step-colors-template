import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HeroUIProvider } from '@heroui/system'
import OnboardingForm from './OnboardingForm'

console.log('Hello World')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HeroUIProvider>
      <OnboardingForm />
    </HeroUIProvider>
  </React.StrictMode>
) 