import React, { useState } from "react";
import "./Login.css";

function Auth() {
  const [mode, setMode] = useState("login"); // login | signup
  const [method, setMethod] = useState("email"); // email | otp
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* =========================
     SOCIAL AUTH (PLACEHOLDER)
  ========================= */

  const handleGoogle = () => {
    alert("Google login will be handled by backend OAuth");
  };

  const handleGithub = () => {
    alert("GitHub login will be handled by backend OAuth");
  };

  /* =========================
     EMAIL LOGIN / SIGNUP
  ========================= */

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint =
          mode === "login"
              ? "http://localhost:5000/api/auth/login"
              : "http://localhost:5000/api/auth/signup";

      const payload =
          mode === "login"
              ? { email, password }
              : { email, password, displayName };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      console.log("Auth success:", data);
      alert(`${mode === "login" ? "Login" : "Signup"} successful`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     OTP PLACEHOLDER
  ========================= */

  const handleSendOtp = () => {
    if (!phone.trim()) {
      setError("Please enter a valid mobile number.");
      return;
    }
    setError("");
    alert("OTP will be handled by backend");
  };

  return (
      <div className="auth-page">
        <div className="auth-card">
          <h1>{mode === "login" ? "Log In" : "Sign Up"}</h1>

          {error && <p className="auth-error">{error}</p>}

          {/* ================= SOCIAL BUTTONS ================= */}
          <div className="social-auth">
            <button onClick={handleGoogle}>Continue with Google</button>
            <button onClick={handleGithub}>Continue with GitHub</button>
            <button disabled>Continue with Apple</button>
          </div>

          <div className="divider">OR</div>

          {/* ================= METHOD SWITCH ================= */}
          <div className="method-switch">
          <span
              className={method === "email" ? "active" : ""}
              onClick={() => setMethod("email")}
          >
            Email
          </span>
            <span
                className={method === "otp" ? "active" : ""}
                onClick={() => setMethod("otp")}
            >
            Mobile OTP
          </span>
          </div>

          {/* ================= EMAIL AUTH ================= */}
          {method === "email" && (
              <form onSubmit={handleEmailAuth}>
                {mode === "signup" && (
                    <input
                        type="text"
                        className="auth-input"
                        placeholder="Display Name"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        required
                    />
                )}

                <input
                    type="email"
                    className="auth-input"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    className="auth-input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                />

                <button type="submit" className="auth-submit" disabled={loading}>
                  {loading
                      ? "Please wait..."
                      : mode === "login"
                          ? "Log In"
                          : "Create Account"}
                </button>
              </form>
          )}

          {/* ================= OTP AUTH ================= */}
          {method === "otp" && (
              <div className="otp-box">
                <input
                    type="tel"
                    className="auth-input"
                    placeholder="Mobile Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <button className="auth-submit" onClick={handleSendOtp}>
                  Send OTP
                </button>
              </div>
          )}

          {/* ================= MODE SWITCH ================= */}
          <p className="switch-text">
            {mode === "login" ? (
                <>
                  New here?{" "}
                  <span onClick={() => setMode("signup")}>
                Create an account
              </span>
                </>
            ) : (
                <>
                  Already have an account?{" "}
                  <span onClick={() => setMode("login")}>Log in</span>
                </>
            )}
          </p>
        </div>
      </div>
  );
}

export default Auth;
