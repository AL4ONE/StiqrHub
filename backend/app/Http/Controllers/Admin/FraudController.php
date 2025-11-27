<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\Registration;

class FraudController extends Controller
{
    // Detect tenants with overlapping registrations across different events
    public function duplicateRegistrations()
    {
        try {
            $regs = Registration::with('event', 'tenant')->orderBy('tenant_id')->get();
            $suspects = [];

            foreach ($regs->groupBy('tenant_id') as $tenantId => $list) {
                $list = $list->values();
                for ($i = 0; $i < $list->count(); $i++) {
                    for ($j = $i + 1; $j < $list->count(); $j++) {
                        $a = $list[$i];
                        $b = $list[$j];
                        $aStart = $a->start_date ? date('Y-m-d', strtotime($a->start_date)) : date('Y-m-d', strtotime($a->event->start_date));
                        $aEnd = $a->end_date ? date('Y-m-d', strtotime($a->end_date)) : date('Y-m-d', strtotime($a->event->end_date));
                        $bStart = $b->start_date ? date('Y-m-d', strtotime($b->start_date)) : date('Y-m-d', strtotime($b->event->start_date));
                        $bEnd = $b->end_date ? date('Y-m-d', strtotime($b->end_date)) : date('Y-m-d', strtotime($b->event->end_date));
                        $overlap = ($aStart <= $bEnd) && ($aEnd >= $bStart);
                        if ($overlap && $a->event_id !== $b->event_id) {
                            $suspects[] = [
                                'tenant' => $a->tenant,
                                'registration_a' => $a,
                                'registration_b' => $b,
                            ];
                        }
                    }
                }
            }

            return ApiResponse::success($suspects, 'Potential duplicate/overlapping registrations');
        } catch (\Throwable $e) {
            return ApiResponse::error('Failed to run fraud detection', 500, $e->getMessage());
        }
    }
}


