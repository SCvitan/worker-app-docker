import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const body = await request.json()
  const { email, password } = body

  try {
    // Here, you would typically validate the email and password against your database
    // For this example, we'll assume the validation is successful

    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    if (response.ok) {
      const token = response.headers.get('Authorization') || response.headers.get('authorization')

      if (token) {
        // Set the JWT as an HTTP-only cookie
        cookies().set({
          name: 'jwt',
          value: token,
          httpOnly: true,
          secure: false,
          sameSite: 'strict',
          maxAge: 60 * 60 * 24 * 7, // 1 week
          path: '/',
        })

        return NextResponse.json({ success: true })
      }
    }

    return NextResponse.json({ success: false }, { status: 401 })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}