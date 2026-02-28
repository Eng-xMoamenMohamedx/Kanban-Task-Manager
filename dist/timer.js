export class Timer {
    getTimeAgo(createdAt) {
        if (!createdAt || isNaN(createdAt))
            return "";
        const elapsed = Date.now() - createdAt;
        if (elapsed < 5000)
            return "Just now";
        return this.formatTime(elapsed);
    }
    formatTime(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        if (days > 0)
            return `${days}d ago`;
        if (hours > 0)
            return `${hours % 24}h ago`;
        if (minutes > 0)
            return `${minutes % 60}m ago`;
        return `${seconds % 60}s ago`;
    }
    startLiveTimer(container) {
        setInterval(() => {
            const timeElements = container.querySelectorAll(".live-time");
            timeElements.forEach((el) => {
                const timeValue = el.dataset.time;
                if (!timeValue)
                    return;
                const createdAt = Number(timeValue);
                if (isNaN(createdAt))
                    return;
                el.textContent = this.getTimeAgo(createdAt);
            });
        }, 1000);
    }
}
