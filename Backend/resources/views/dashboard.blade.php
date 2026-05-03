<h2>قائمة الوظائف المتاحة</h2>
<table border="1" style="width:100%; border-collapse: collapse; text-align: center;">
    <thead>
        <tr style="background-color: #f2f2f2;">
            <th>اسم الوظيفة</th>
            <th>الوصف</th>
            <th>الموقع</th>
            <th>الراتب</th>
            <th>تقديم</th>
        </tr>
    </thead>
    <tbody>
        @foreach($jobs as $job)
            <tr>
                {{-- التعديل هنا: استخدام job_title بدلاً من title --}}
                <td>{{ $job->job_title }}</td>

                {{-- التعديل هنا: استخدام job_description بدلاً من description --}}
                <td>{{ $job->job_description }}</td>

                <td>{{ $job->location ?? 'غير محدد' }}</td>
                <td>{{ number_format($job->salary, 2) }}</td>
                <td>
                    {{-- تأكد إن الـ route ده متسجل في web.php --}}
                    <a href="{{ route('apply.page', $job->id) }}" style="color: blue; text-decoration: underline;">Apply
                        Now</a>
                </td>
            </tr>
        @endforeach
    </tbody>
</table>