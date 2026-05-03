<!DOCTYPE html>
<html lang="ar" dir="rtl">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>نظام الامتحان الذكي</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
    </style>
</head>

<body class="bg-gray-100 p-8">

    <div class="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div class="flex justify-between items-center border-b pb-4 mb-6">
            <h1 class="text-2xl font-bold text-blue-600">امتحان التقييم التقني</h1>
            <span class="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">رقم الجلسة:
                {{ $session->id }}</span>
        </div>

        <div class="mb-4 text-red-600 font-semibold text-center p-2 bg-red-50 rounded hidden" id="warning-msg">
            تحذير: تم رصد محاولة خروج من الصفحة!
        </div>

        <form id="exam-form">
            @foreach($questions as $index => $question)
                <div class="mb-8 p-4 border rounded-lg hover:bg-gray-50 transition">
                    <p class="text-lg font-medium mb-4">{{ $index + 1 }}. {{ $question->question_text }}</p>

                    <div class="space-y-2">
                        @foreach($question->options as $option)
                            <label class="flex items-center p-3 border rounded cursor-pointer hover:border-blue-400">
                                <input type="radio" name="question_{{ $question->id }}" value="{{ $option->id }}" class="ml-2">
                                <span>{{ $option->option_text }}</span>
                            </label>
                        @endforeach
                    </div>
                </div>
            @endforeach

            <button type="submit"
                class="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition">
                إنهاء الامتحان وإرسال الإجابات
            </button>
        </form>
    </div>

    <script>
        window.onblur = function () {
            document.getElementById('warning-msg').classList.remove('hidden');

            // لازم نبعت الـ UUID مش الـ ID العادي
            // لو جدول الـ assessments فيه عمود اسمه assessmentId، نستخدمه هنا
            let data = {
                assessmentId: "{{ $session->assessmentId ?? $session->id }}",
                candidateId: "{{ Auth::id() }}",
                candidateName: "{{ Auth::user()->name }}",
                hrId: "1",
                type: "TAB_SWITCH",
                duration_seconds: 5
            };

            fetch("/api/proctoring/violation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "X-CSRF-TOKEN": "{{ csrf_token() }}"
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(json => {
                    console.log("Response:", json);
                    // لو طلع لك Warning في Alert يبقى مبروك الداتا وصلت
                    if (json.warning) alert(json.warning);
                })
                .catch(err => console.error("Error:", err));
        };
    </script>
</body>

</html>