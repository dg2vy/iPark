package metrics

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"
	"sync"
	"time"

	"github.com/prometheus/client_golang/prometheus"
)

type Metrics struct {
	Errors         int         `json:"errors"`
	Matched        int         `json:"matched"`
	Templates      int         `json:"templates"`
	PercentComplete json.Number `json:"percent"`
	Requests       int         `json:"requests"`
	TotalRequests  int         `json:"total"`
	Hosts          int         `json:"hosts"`
	RPS            json.Number `json:"rps"`
}

var (
	ports = []int{8000}
	latestMetrics = make(map[int]Metrics)
	mu sync.Mutex

	// Prometheus metrics
	errorsMetric = prometheus.NewGaugeVec(prometheus.GaugeOpts{
		Name: "nuclei_errors",
		Help: "Number of errors",
	}, []string{"port"})

	matchedMetric = prometheus.NewGaugeVec(prometheus.GaugeOpts{
		Name: "nuclei_matched",
		Help: "Number of matched results",
	}, []string{"port"})

	templatesMetric = prometheus.NewGaugeVec(prometheus.GaugeOpts{
		Name: "nuclei_templates",
		Help: "Number of templates processed",
	}, []string{"port"})

	percentCompleteMetric = prometheus.NewGaugeVec(prometheus.GaugeOpts{
		Name: "nuclei_percent_complete",
		Help: "Percentage of completion",
	}, []string{"port"})

	requestsMetric = prometheus.NewGaugeVec(prometheus.GaugeOpts{
		Name: "nuclei_requests",
		Help: "Number of requests made",
	}, []string{"port"})

	totalRequestsMetric = prometheus.NewGaugeVec(prometheus.GaugeOpts{
		Name: "nuclei_total_requests",
		Help: "Total number of requests",
	}, []string{"port"})

	hostsMetric = prometheus.NewGaugeVec(prometheus.GaugeOpts{
		Name: "nuclei_hosts",
		Help: "Number of hosts scanned",
	}, []string{"port"})

	rpsMetric = prometheus.NewGaugeVec(prometheus.GaugeOpts{
		Name: "nuclei_rps",
		Help: "Requests per second",
	}, []string{"port"})
)

func init() {
	// Register Prometheus metrics
	prometheus.MustRegister(
		errorsMetric,
		matchedMetric,
		templatesMetric,
		percentCompleteMetric,
		requestsMetric,
		totalRequestsMetric,
		hostsMetric,
		rpsMetric,
	)
}

// fetchMetrics retrieves metrics from a specified port
func fetchMetrics(port int) {
	url := fmt.Sprintf("http://localhost:%d/metrics", port)
	resp, err := http.Get(url)
	if err != nil {
		log.Printf("Failed to fetch metrics from port %d: %v", port, err)
		return
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Printf("Failed to read response body from port %d: %v", port, err)
		return
	}

	var metrics Metrics
	if err := json.Unmarshal(body, &metrics); err != nil {
		log.Printf("Failed to unmarshal metrics from port %d: %v", port, err)
		return
	}

	// Parse PercentComplete and RPS as integers
	percentCompleteInt, err := strconv.Atoi(metrics.PercentComplete.String())
	if err != nil {
		log.Printf("Failed to parse PercentComplete as int from port %d: %v", port, err)
		return
	}

	rpsInt, err := strconv.Atoi(metrics.RPS.String())
	if err != nil {
		log.Printf("Failed to parse RPS as int from port %d: %v", port, err)
		return
	}

	mu.Lock()
	latestMetrics[port] = metrics
	mu.Unlock()

	// Update Prometheus metrics
	portStr := strconv.Itoa(port)
	errorsMetric.WithLabelValues(portStr).Set(float64(metrics.Errors))
	matchedMetric.WithLabelValues(portStr).Set(float64(metrics.Matched))
	templatesMetric.WithLabelValues(portStr).Set(float64(metrics.Templates))
	percentCompleteMetric.WithLabelValues(portStr).Set(float64(percentCompleteInt))
	requestsMetric.WithLabelValues(portStr).Set(float64(metrics.Requests))
	totalRequestsMetric.WithLabelValues(portStr).Set(float64(metrics.TotalRequests))
	hostsMetric.WithLabelValues(portStr).Set(float64(metrics.Hosts))
	rpsMetric.WithLabelValues(portStr).Set(float64(rpsInt))

	log.Printf("Updated metrics for port %d", port)
}

// StartFetchingMetrics continuously fetches metrics for each port in the list
func StartFetchingMetrics() {
	for {
		wg := sync.WaitGroup{}
		for _, port := range ports {
			wg.Add(1)
			go func(port int) {
				defer wg.Done()
				fetchMetrics(port)
			}(port)
		}
		wg.Wait()
		time.Sleep(5 * time.Second)
	}
}

