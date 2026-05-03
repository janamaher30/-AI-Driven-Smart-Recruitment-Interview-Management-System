<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">طلبات التقديم الخاصة بي</h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                <table class="w-full text-center border-collapse">
                    <thead>
                        <tr class="border-b bg-gray-50">
                            <th class="py-3">رقم الوظيفة</th>
                            <th class="py-3">الحالة</th>
                            <th class="py-3">تاريخ التقديم</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse($applications as $app)
                            <tr class="border-b">
                                <td class="py-3">{{ $app->job_post_id }}</td>
                                <td class="py-3">
                                    <span class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded">{{ $app->status }}</span>
                                </td>
                                <td class="py-3">{{ $app->created_at->format('Y-m-d') }}</td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="3" class="py-10 text-gray-500">لم تقم بالتقديم على أي وظائف بعد.</td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-app-layout>