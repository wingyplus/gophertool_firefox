package main

import (
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
)

func main() {
	root := "/Users/wingyplus/go/src"
	packages := make([]string, 0)
	err := filepath.Walk(root, func(path string, info os.FileInfo, err error) error {
		if !info.IsDir() {
			return err
		}

		if path == root {
			return err
		}

		if strings.Contains(path, "testdata") {
			return err
		}

		packages = append(packages, path[len(root)+1:])
		return err
	})
	if err != nil {
		panic(err)
	}

	js := fmt.Sprintf(`var packages = ["%s"]`, strings.Join(packages, `","`))
	err = ioutil.WriteFile("data/packages.js", []byte(js), 0644)
	if err != nil {
		panic(err)
	}
}
