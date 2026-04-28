function updateInterviewDate() {
    const newDate = document.getElementById('rescheduleDate').value;
    const newTime = document.getElementById('rescheduleTime').value;

    if(newDate && newTime) {
        alert(`Successfully rescheduled to ${newDate} at ${newTime}`);
        
        const modal = bootstrap.Modal.getInstance(document.getElementById('rescheduleModal'));
        modal.hide();
                document.querySelector('.interview-time-cell').innerText = newDate + ' ' + newTime;
    }
}