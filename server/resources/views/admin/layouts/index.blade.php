<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta name="author" content="Themesdesign" />
    @include('admin.includes.styles')
</head>
<body class="body">
<div id="wrapper">
    <div id="page" class="">
        <div class="layout-wrap">
            @include('admin.includes.sidebar')

            <div class="section-content-right">
                @include('admin.includes.navbar')

                <div class="main-content">
                    @yield('content')

                    <div class="bottom-page">
                        @include('admin.includes.footer')
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

@include('admin.includes.scripts')
</body>
</html>
