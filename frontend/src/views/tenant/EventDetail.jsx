import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Stack,
  Chip,
  Alert,
  CircularProgress,
  Divider
} from "@mui/material";
import PageContainer from "src/components/container/PageContainer";
import { BACKEND_URL } from "src/config/constants";
import { apiGet, apiPost } from "src/utils/api";
import { useParams } from "react-router-dom";
import { formatDateIndonesia } from "src/utils/dateFormat";

export default function EventDetail() {
  const params = useParams();
  const id = params.id || window.location.pathname.split("/").pop();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [registering, setRegistering] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [hasRegistered, setHasRegistered] = useState(false);


  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError("");

        console.log("Fetching event id:", id);
        const data = await apiGet(`${BACKEND_URL}/api/tenant/events/${id}`);
        const ev = data?.data || null;
        setEvent(ev);

        if (ev) {
          const active = await apiGet(`${BACKEND_URL}/api/tenant/events/active`);
          const activeList = Array.isArray(active)
            ? active
            : active?.data || [];
          const isRegistered = activeList.some(
            (e) => String(e.id) === String(id)
          );
          setHasRegistered(isRegistered);
        }
      } catch (e) {
        console.error("Error loading event:", e);
        setError("Failed to load event");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const isPerDay = event?.payment_method === "per_day";
  const canRegister = !isPerDay || (startDate && endDate);

  // Price preview breakdown (mirrors backend calculation)
  const platformFee = 5000;
  const insuranceFee = event?.insurance_active ? 10000 : 0;

  const toNumber = (v) => {
    const n = typeof v === 'string' ? parseFloat(v) : v;
    return Number.isFinite(n) ? n : 0;
  };

  const selectedDays = (() => {
    if (!event) return 0;
    if (!isPerDay) return 1;
    if (!startDate || !endDate) return 0;
    try {
      const s = new Date(startDate);
      const e = new Date(endDate);
      const ms = e.getTime() - s.getTime();
      const days = Math.floor(ms / (1000 * 60 * 60 * 24)) + 1;
      return Math.max(0, days);
    } catch { return 0; }
  })();
  const boothSubtotal = (() => {
    if (!event) return 0;
    const unit = toNumber(event.booth_price);
    return isPerDay ? unit * (selectedDays || 0) : unit;
  })();
  const totalPreview = toNumber(boothSubtotal) + platformFee + insuranceFee;

  const handleRegister = async () => {
    if (!canRegister) return;
    setRegistering(true);
    setError("");
    try {
      const body = {
        start_date: isPerDay ? startDate : null,
        end_date: isPerDay ? endDate : null,
      };
      const res = await apiPost(
        `${BACKEND_URL}/api/tenant/events/${id}/register`,
        body
      );
      if (res?.data) {
        window.location.href = `/app/tenant/events/${id}`;
      }
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to register");
    } finally {
      setRegistering(false);
    }
  };

  const handleClaim = () => {
    window.location.href = `/app/tenant/events/${id}/claim`;
  };

  const StatusChip = ({ value }) => {
    const color =
      value === "ACTIVATED"
        ? "success"
        : value === "PUBLISHED"
        ? "primary"
        : "default";
    return <Chip label={value} color={color} />;
  };


  if (loading)
    return (
      <PageContainer title="Event Detail">
        <Typography>Loading...</Typography>
      </PageContainer>
    );
  if (error)
    return (
      <PageContainer title="Event Detail">
        <Typography color="error">{error}</Typography>
      </PageContainer>
    );
  if (!event)
    return (
      <PageContainer title="Event Detail">
        <Typography>Event not found</Typography>
      </PageContainer>
    );


  return (
    <PageContainer title="Event Detail">
      <Card>
        <CardContent>
          {(event?.banner_url || event?.banner) && (
            <Box
              mb={2}
              sx={{
                width: "100%",
                height: 260,
                overflow: "hidden",
                borderRadius: 1,
                backgroundColor: "#f5f5f5",
              }}
            >
              <img
                src={event.banner_url || `${BACKEND_URL}/storage/${event.banner}`}
                alt={event.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </Box>
          )}


          <Box display="flex" gap={1} mb={2} alignItems="center">
            <StatusChip value={event.status} />
            <Chip label={event.payment_method} variant="outlined" />
            {event.insurance_active && (
              <Chip label="Insurance Active" color="info" />
            )}
          </Box>

    </PageContainer>
  );
}
