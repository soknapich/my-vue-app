<template>
    <div class="max-w-7xl mx-auto bg-white p-1">
      <div class="grid grid-cols-12 gap-6">
  
        <!-- LEFT COLUMN -->
        <div class="col-span-4 bg-gray-50 p-2">
          <h3 class="text-lg font-semibold mb-3">General Info</h3>
  
          <div class="space-y-2 text-sm">
            <p><span class="font-medium">ID:</span> {{ data.id }}</p>
            <p><span class="font-medium">Title:</span> {{ data.title }}</p>
            <p><span class="font-medium">Spec:</span> {{ data.spec }}</p>
            <p><span class="font-medium">Brand:</span> {{ data.brand }}</p>
            <p><span class="font-medium">Size:</span> {{ data.size }}</p>
            <p><span class="font-medium">Unit:</span> {{ data.unit }}</p>
            <p><span class="font-medium">Quantity:</span> {{ data.qty }}</p>
            <p><span class="font-medium">Parent ID:</span> {{ data.parent_id }}</p>
          </div>
  
          <h4 class="mt-4 font-semibold">Created By</h4>
          <div class="text-sm text-gray-600">
            <p>Name: {{ data.created_by?.name }}</p>
            <p>Email: {{ data.created_by?.email }}</p>
          </div>
        </div>
  
        <!-- RIGHT COLUMN -->
        <div class="col-span-8">
          <h3 class="text-lg font-semibold mb-3">Cost Breakdown</h3>
  
          <div class="grid grid-cols-3 gap-4 mb-4">
            <div class="bg-blue-50 p-4 rounded border">
              <p class="text-sm text-gray-500">Material</p>
              <p class="text-xl font-bold">$ {{ data.material_val }}</p>
            </div>
  
            <div class="bg-yellow-50 p-4 rounded border">
              <p class="text-sm text-gray-500">Labor</p>
              <p class="text-xl font-bold">$ {{ data.labor_val }}</p>
            </div>
  
            <div class="bg-green-50 p-4 rounded border">
              <p class="text-sm text-gray-500">Total</p>
              <p class="text-xl font-bold">$ {{ data.total }}</p>
            </div>
          </div>
  
          <h3 class="text-lg font-semibold mb-3">Actual Cost</h3>
  
          <div class="grid grid-cols-3 gap-4">
            <div class="bg-blue-100 p-4 rounded border">
              <p class="text-sm text-gray-500">Actual Material</p>
              <p class="text-xl font-bold">$ {{ data.actual_material_val }}</p>
            </div>
  
            <div class="bg-yellow-100 p-4 rounded border">
              <p class="text-sm text-gray-500">Actual Labor</p>
              <p class="text-xl font-bold">$ {{ data.actual_labor_val }}</p>
            </div>
  
            <div class="bg-green-100 p-4 rounded border">
              <p class="text-sm text-gray-500">Actual Total</p>
              <p class="text-xl font-bold">$ {{ data.actual_total }}</p>
            </div>
          </div>
        </div>
  
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    data: {
      type: Object,
      required: true
    }
  })
  </script>
  