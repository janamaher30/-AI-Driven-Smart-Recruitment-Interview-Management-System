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
                <?php echo e($session->id); ?></span>
        </div>

        <div class="mb-4 text-red-600 font-semibold text-center p-2 bg-red-50 rounded hidden" id="warning-msg">
            تحذير: تم رصد محاولة خروج من الصفحة!
        </div>

        <form id="exam-form">
            <?php $__currentLoopData = $questions; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $index => $question): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                <div class="mb-8 p-4 border rounded-lg hover:bg-gray-50 transition">
                    <p class="text-lg font-medium mb-4"><?php echo e($index + 1); ?>. <?php echo e($question->question_text); ?></p>

                    <div class="space-y-2">
                        <?php $__currentLoopData = $question->options; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $option): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                            <label class="flex items-center p-3 border rounded cursor-pointer hover:border-blue-400">
                                <input type="radio" name="question_<?php echo e($question->id); ?>" value="<?php echo e($option->id); ?>" class="ml-2">
                                <span><?php echo e($option->option_text); ?></span>
                            </label>
                        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                    </div>
                </div>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>

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
                assessmentId: "<?php echo e($session->assessmentId ?? $session->id); ?>",
                candidateId: "<?php echo e(Auth::id()); ?>",
                candidateName: "<?php echo e(Auth::user()->name); ?>",
                hrId: "1",
                type: "TAB_SWITCH",
                duration_seconds: 5
            };

            fetch("/api/proctoring/violation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "X-CSRF-TOKEN": "<?php echo e(csrf_token()); ?>"
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

</html><?php /**PATH C:\Users\HP\Downloads\-AI-Driven-Smart-Recruitment-Interview-Management-System-main\Backend\resources\views/exam/show.blade.php ENDPATH**/ ?>