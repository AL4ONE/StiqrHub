<?php

namespace App\Http\Controllers\EO;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\EventRule;
use Illuminate\Http\Request;

class EventRuleController extends Controller
{

    public function index($eventId)
    {

        $event = Event::where('id', $eventId)
            ->where('eo_id', auth()->user()->id)
            ->first();

        if (!$event) {
            return ApiResponse::error("Event not found or unauthorized", 404);
        }

        $rules = EventRule::where('event_id', $eventId)->get();
        return ApiResponse::success($rules, "Event rules retrieved successfully");
    }

    public function store(Request $request, $eventId)
    {
        $event = Event::where('id', $eventId)
            ->where('eo_id', auth()->user()->id)
            ->first();

        if (!$event) {
            return ApiResponse::error("Event not found or unauthorized", 404);
        }

        try {
            $validated = $request->validate([
                'rule' => 'required|string|max:255',
            ]);

            $rule = EventRule::create([
                'event_id' => $eventId,
                'rule_name' => $validated['rule'],
                'is_mandatory' => true,
            ]);

            return ApiResponse::success($rule, "Rule created successfully", 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return ApiResponse::error("Validation failed", 422, $e->errors());
        } catch (\Throwable $e) {
            return ApiResponse::error("Failed to create rule", 500, $e->getMessage());
        }
    }

    public function update(Request $request, $eventId, $ruleId)
    {
        $event = Event::where('id', $eventId)
            ->where('eo_id', auth()->user()->id)
            ->first();

        if (!$event) {
            return ApiResponse::error("Event not found or unauthorized", 404);
        }

        $rule = EventRule::where('id', $ruleId)
            ->where('event_id', $eventId)
            ->first();

        if (!$rule) {
            return ApiResponse::error("Rule not found", 404);
        }

        try {
            $validated = $request->validate([
                'rule_name' => 'sometimes|string|max:255',
                'is_mandatory' => 'boolean',
            ]);

            $rule->update($validated);
            return ApiResponse::success($rule->fresh(), "Rule updated successfully");
        } catch (\Illuminate\Validation\ValidationException $e) {
            return ApiResponse::error("Validation failed", 422, $e->errors());
        } catch (\Throwable $e) {
            return ApiResponse::error("Failed to update rule", 500, $e->getMessage());
        }
    }
    public function destroy($eventId, $ruleId)
    {
        $event = Event::where('id', $eventId)
            ->where('eo_id', auth()->user()->id)
            ->first();

        if (!$event) {
            return ApiResponse::error("Event not found or unauthorized", 404);
        }

        $rule = EventRule::where('id', $ruleId)
            ->where('event_id', $eventId)
            ->first();

        if (!$rule) {
            return ApiResponse::error("Rule not found", 404);
        }

        try {
            $rule->delete();
            return ApiResponse::success(null, "Rule deleted successfully");
        } catch (\Throwable $e) {
            return ApiResponse::error("Failed to delete rule", 500, $e->getMessage());
        }
    }


    public function bulkStore(Request $request, $eventId)
    {
        $event = Event::where('id', $eventId)
            ->where('eo_id', auth()->user()->id)
            ->first();

        if (!$event) {
            return ApiResponse::error("Event not found or unauthorized", 404);
        }

        try {
            $validated = $request->validate([
                'rules' => 'required|array|min:1',
                'rules.*.rule_name' => 'required|string|max:255',
                'rules.*.is_mandatory' => 'boolean',
            ]);

            $createdRules = [];
            foreach ($validated['rules'] as $ruleData) {
                $createdRules[] = EventRule::create([
                    'event_id' => $eventId,
                    'rule_name' => $ruleData['rule_name'],
                    'is_mandatory' => $ruleData['is_mandatory'] ?? true,
                ]);
            }

            return ApiResponse::success($createdRules, "Rules created successfully", 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return ApiResponse::error("Validation failed", 422, $e->errors());
        } catch (\Throwable $e) {
            return ApiResponse::error("Failed to create rules", 500, $e->getMessage());
        }
    }
}
