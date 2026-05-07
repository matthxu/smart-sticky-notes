import { Routes, Route, Navigate } from "react-router-dom"
import { Login } from "@/pages/Login"
import { Signup } from "@/pages/Signup"
import { ProtectedRoute } from "@/components/ui/ProtectedRoute"
import { Home } from "@/pages/Home"
import { Bin } from "@/pages/Bin"
import { Settings } from "@/pages/Settings"

export default function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/bin" element={<ProtectedRoute><Bin /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}
