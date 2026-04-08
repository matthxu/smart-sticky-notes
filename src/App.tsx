import { Routes, Route, Navigate } from "react-router-dom"
import { Login } from "@/pages/Login"
import { Signup } from "@/pages/Signup"
import { ProtectedRoute } from "@/components/ui/ProtectedRoute"

function Home() {
    return <div className="p-8 text-2xl font-semibold">Home (coming soon)</div>
}

export default function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}
