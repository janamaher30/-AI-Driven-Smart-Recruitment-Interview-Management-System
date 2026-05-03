<!DOCTYPE html>
<html lang="ar" dir="rtl">

<head>
    <meta charset="UTF-8">
    <title>تجرية إضافة وظيفة</title>
    <style>
        body {
            font-family: sans-serif;
            background: #f4f4f4;
            padding: 50px;
            text-align: center;
        }

        .card {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            display: inline-block;
            width: 400px;
        }

        input,
        textarea {
            width: 90%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        button {
            background: #28a745;
            color: white;
            border: none;
            padding: 10px 20px;
            cursor: pointer;
            border-radius: 5px;
            width: 100%;
        }
    </style>
</head>

<body>

    <div class="card">
        <h2>إضافة وظيفة تجريبية 🛠️</h2>

        <form action="/jobs" method="POST">
            @csrf <input type="text" name="title" placeholder="اسم الوظيفة (مثلاً: Cyber Security Intern)" required>
            <textarea name="description" placeholder="وصف الوظيفة" required></textarea>
            <input type="text" name="location" placeholder="الموقع (مثلاً: القاهرة)" required>
            <input type="number" name="salary" placeholder="الراتب (اختياري)">

            <button type="submit">نشر الوظيفة الآن</button>
        </form>
    </div>

</body>

</html>