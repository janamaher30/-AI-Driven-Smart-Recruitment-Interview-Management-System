@extends('layout')
@section('content')
     <form action="{{url('send_name')}}" method="post">
         @csrf
         <input type="text" name='' placeholder="Your Name">
         <button>Submit</button>
     </form>
@endsection 