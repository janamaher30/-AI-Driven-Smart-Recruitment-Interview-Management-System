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
        <?php $__currentLoopData = $jobs; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $job): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
            <tr>
                
                <td><?php echo e($job->job_title); ?></td>

                
                <td><?php echo e($job->job_description); ?></td>

                <td><?php echo e($job->location ?? 'غير محدد'); ?></td>
                <td><?php echo e(number_format($job->salary, 2)); ?></td>
                <td>
                    
                    <a href="<?php echo e(route('apply.page', $job->id)); ?>" style="color: blue; text-decoration: underline;">Apply
                        Now</a>
                </td>
            </tr>
        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
    </tbody>
</table><?php /**PATH D:\Jana\SE Project\code\-AI-Driven-Smart-Recruitment-Interview-Management-System\Backend\resources\views/dashboard.blade.php ENDPATH**/ ?>