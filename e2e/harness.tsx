import * as React from 'react'
import { createRoot } from 'react-dom/client'
import ReactKakaoPostcode, { ReactKakaoPostcodeHandle, PostcodeCompleteData } from '../src/index'

const { useState, useRef } = React

function DefaultEmbedScenario() {
    const [result, setResult] = useState<PostcodeCompleteData | null>(null)
    return (
        <section data-testid="scenario-default">
            <ReactKakaoPostcode onChange={(data) => setResult(data)} />
            <pre data-testid="scenario-default-result">{result ? JSON.stringify(result) : ''}</pre>
        </section>
    )
}

function PopupScenario() {
    const [result, setResult] = useState<PostcodeCompleteData | null>(null)
    return (
        <section data-testid="scenario-popup">
            <ReactKakaoPostcode
                mode="popup"
                openOptions={{ q: 'seed-query', autoClose: false }}
                onChange={(data) => setResult(data)}
            />
            <pre data-testid="scenario-popup-result">{result ? JSON.stringify(result) : ''}</pre>
        </section>
    )
}

function CustomRefScenario() {
    const ref = useRef<ReactKakaoPostcodeHandle>(null)
    const [result, setResult] = useState<PostcodeCompleteData | null>(null)
    return (
        <section data-testid="scenario-ref">
            <ReactKakaoPostcode ref={ref} hideDefaultButtons onChange={(data) => setResult(data)} />
            <button data-testid="scenario-ref-trigger" onClick={() => ref.current && ref.current.open()}>custom open</button>
            <button data-testid="scenario-ref-close" onClick={() => ref.current && ref.current.close()}>custom close</button>
            <pre data-testid="scenario-ref-result">{result ? JSON.stringify(result) : ''}</pre>
        </section>
    )
}

function OptionsScenario() {
    return (
        <section data-testid="scenario-options">
            <ReactKakaoPostcode
                onChange={() => undefined}
                postcodeOptions={{
                    width: 640,
                    height: 480,
                    animation: false,
                    autoMappingRoad: false,
                    theme: { bgColor: '#123456' },
                }}
                openOptions={{ q: 'options-query' }}
            />
        </section>
    )
}

function CallbacksScenario() {
    const [closeState, setCloseState] = useState('')
    const [size, setSize] = useState<{ width: number, height: number } | null>(null)
    const [search, setSearch] = useState<{ q: string, count: number } | null>(null)
    return (
        <section data-testid="scenario-callbacks">
            <ReactKakaoPostcode
                onChange={() => undefined}
                onClose={(state) => setCloseState(state)}
                onResize={(s) => setSize(s)}
                onSearch={(data) => setSearch(data)}
            />
            <pre data-testid="scenario-callbacks-close">{closeState}</pre>
            <pre data-testid="scenario-callbacks-resize">{size ? JSON.stringify(size) : ''}</pre>
            <pre data-testid="scenario-callbacks-search">{search ? JSON.stringify(search) : ''}</pre>
        </section>
    )
}

function ScriptLifecycleScenario() {
    const [mounted, setMounted] = useState(true)
    return (
        <section data-testid="scenario-script">
            <button data-testid="scenario-script-toggle" onClick={() => setMounted((m) => !m)}>toggle</button>
            {mounted && <ReactKakaoPostcode scriptId="e2e-script" onChange={() => undefined} />}
        </section>
    )
}

function App() {
    return (
        <React.Fragment>
            <DefaultEmbedScenario />
            <PopupScenario />
            <CustomRefScenario />
            <OptionsScenario />
            <CallbacksScenario />
            <ScriptLifecycleScenario />
        </React.Fragment>
    )
}

const container = document.getElementById('root')
if (container) {
    createRoot(container).render(<App />)
}
