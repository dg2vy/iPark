package main

import (
        "log"
        "maestro/internal/metrics"
        "maestro/internal/server"
        "net/http"

        "github.com/prometheus/client_golang/prometheus/promhttp"
)

func main() {
        // Start background metric fetching and port monitoring
        go metrics.StartFetchingMetrics()
        go server.MonitorPorts()

        // Expose the registered metrics at /metrics
        http.Handle("/metrics", promhttp.Handler())
        log.Fatal(http.ListenAndServe(":9000", nil))
}