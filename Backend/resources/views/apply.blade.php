<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">التقديم على وظيفة</h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            @if(session('error'))
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    {{ session('error') }}
                </div>
            @endif

            <div class="bg-white p-6 shadow-sm sm:rounded-lg">
                <form action="{{ route('apply.store') }}" method="POST" enctype="multipart/form-data">
                    @csrf


                    <input type="hidden" name="job_post_id" value="{{ $job->id ?? $job_id }}">

                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">ارفع سيرتك الذاتية (PDF فقط)</label>
                        <input type="file" name="cv" class="border rounded w-full py-2 px-3" required accept=".pdf">
                        @error('cv')
                            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        إرسال الطلب
                    </button>
                </form>
            </div>
        </div>
    </div>
</x-app-layout>