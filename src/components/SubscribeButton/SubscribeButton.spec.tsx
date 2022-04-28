import { fireEvent, render, screen } from '@testing-library/react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import { SubscribeButton } from '.'

jest.mock('next-auth/react')
jest.mock('next/router')

describe('SubscribeButton component', () => {
  it('renders correctly when user is not authenticated', () => {
    const useSessionMocked = jest.mocked(useSession)
    
    useSessionMocked.mockReturnValueOnce({ data: null, status: "unauthenticated" })

    render(<SubscribeButton priceId='price-id' />)
  
    expect(screen.getByText('Subscribe now')).toBeInTheDocument()
  })

  it('redirects user to sign in when not authenticated', () => {
    const signInMocked = jest.mocked(signIn)
    const useSessionMocked = jest.mocked(useSession)
    
    useSessionMocked.mockReturnValueOnce({ data: null, status: "unauthenticated" })

    render(<SubscribeButton priceId='price-id' />)

    const subscribeButton = screen.getByText('Subscribe now')
  
    fireEvent.click(subscribeButton)

    expect(signInMocked).toHaveBeenCalled()
  })

  it('redirects to posts when user already has subscription', () => {
    const useRouterMocked = jest.mocked(useRouter)
    const useSessionMocked = jest.mocked(useSession)

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: 'John Doe',
          email: 'john.doe@email.com'
        },
        activeSubscription: 'fake-active-subscription',
        expires: 'fake-expires'
      },
      status: "authenticated"
    })

    const pushMock = jest.fn()

    useRouterMocked.mockReturnValueOnce({
      push: pushMock
    } as any)

    render(<SubscribeButton priceId='price-id' />)

    const subscribeButton = screen.getByText('Subscribe now')
  
    fireEvent.click(subscribeButton)

    expect(pushMock).toHaveBeenCalledWith('/posts')
  })
})