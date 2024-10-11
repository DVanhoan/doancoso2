<?php

namespace App\Http\Middleware;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Middleware\Authenticate as Middleware;



class Authenticate extends Middleware
{
    /**
     * Tùy chỉnh phản hồi khi xác thực thất bại.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        // Nếu là yêu cầu API, trả về lỗi 401 thay vì chuyển hướng
        if ($request->expectsJson()) {
            return null;
        }

        // Nếu không phải API, chuyển hướng đến route login
        return route('login');
    }

    /**
     * Xử lý khi không xác thực được.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  array  $guards
     * @return void
     *
     * @throws \Illuminate\Auth\AuthenticationException
     */
    protected function unauthenticated($request, array $guards)
    {
        if ($request->expectsJson()) {
            // Trả về phản hồi JSON nếu là yêu cầu từ API
            throw new AuthenticationException(
                'Unauthorized.', $guards, null
            );
        }

        // Chuyển hướng về trang login nếu không phải yêu cầu từ API
        throw new AuthenticationException(
            'Unauthenticated.', $guards, $this->redirectTo($request)
        );
    }
}

