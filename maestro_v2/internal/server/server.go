package server

import (
	"log"
	"sync"
	"time"
)

var (
	ports         = []int{8000}
	latestMetrics = make(map[int]interface{})
	mu            sync.Mutex
)

// MonitorPorts checks for new ports to monitor at intervals and adds them
func MonitorPorts() {
	for {
		time.Sleep(10 * time.Second)
		newPort := 8003
		mu.Lock()
		if _, exists := latestMetrics[newPort]; !exists {
			log.Printf("New port detected: %d", newPort)
			ports = append(ports, newPort)
		}
		mu.Unlock()
	}
}

