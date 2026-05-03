<form action="{{ route('jobs.update', $job->id) }}" method="POST">
    @csrf
    @method('PUT')

    <label>اسم الوظيفة:</label>
    <input type="text" name="title" value="{{ $job->title }}">

    <label>الموقع:</label>
    <input type="text" name="location" value="{{ $job->location }}">

    <label>الراتب:</label>
    <input type="number" name="salary" value="{{ $job->salary }}">

    <button type="submit">تحديث البيانات</button>
</form>