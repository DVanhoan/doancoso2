@extends('admin.layouts.index')

@section('content')
    <div class="main-content-inner">
        <div class="main-content-wrap">
            <div class="flex items-center flex-wrap justify-between gap20 mb-27">
                <h3>Users</h3>
                <ul class="breadcrumbs flex items-center flex-wrap justify-start gap10">
                    <li>
                        <a href="{{route('admin.dashboard')}}">
                            <div class="text-tiny">Dashboard</div>
                        </a>
                    </li>
                    <li>
                        <i class="icon-chevron-right"></i>
                    </li>
                    <li>
                        <div class="text-tiny">All User</div>
                    </li>
                </ul>
            </div>
             <div class="wg-box">
                 <div class="flex items-center justify-between gap10 flex-wrap">
                        <div class="wg-filter flex-grow">
                            <form class="form-search">
                                <fieldset class="name">
                                    <input type="text" placeholder="Search here..." class="" name="name"
                                           tabindex="2" value="" aria-required="true" required="">
                                </fieldset>
                                <div class="button-submit">
                                    <button class="" type="submit"><i class="icon-search"></i></button>
                                </div>
                            </form>
                        </div>

                    </div>
                    <div class="wg-table table-all-user">
                        <div class="table-responsive">
                            <table class="table table-striped table-bordered">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>User</th>
                                    
                                    <th>Email</th>
                                    <th>Created on</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                @foreach($users as $user)
                                    <tbody>
                                    <tr>
                                        <td>{{$user->id}}</td>
                                        <td class="pname">
                                            <div class="image">
                                                <img src="{{asset('uploads/users')}}/{{$user->image}}" alt="" class="image">
                                            </div>
                                            <div class="name">
                                                <a href="#" class="body-title-2">{{$user->name}}</a>
                                            </div>
                                        </td>
                                       
                                        <td>{{$user->email}}</td>
                                        <td>{{$user->created_at}}</td>
                                        <td>
                                            <a href="{{route('admin.users.edit', $user->id)}}">Edit</a>
                                            <form action="{{route('admin.users.destroy', $user->id)}}" method="POST" style="display:inline;">
                                                @csrf
                                                @method('DELETE')
                                                <button type="submit">Delete</button>
                                            </form>
                                        </td>
                                    </tr>
                                    </tbody>
                                @endforeach

                            </table>
                        </div>

                    </div>
                    <div class="divider"></div>
                    <div class="flex items-center justify-between flex-wrap gap10 wgp-pagination">
                        {{$users->links("pagination::bootstrap-5")}}
                    </div>
                </div>
            </div>
        </div>
@endsection
