import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  Checkbox,
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
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [dialogStep, setDialogStep] = useState("review"); // review -> terms -> payment
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("bank_transfer");
  const [confirmedPaymentMethod, setConfirmedPaymentMethod] = useState(null);
  const [paymentSummary, setPaymentSummary] = useState(null);
  const [registrationError, setRegistrationError] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [conflictWarningOpen, setConflictWarningOpen] = useState(false);
  const [conflictEvents, setConflictEvents] = useState([]);
  const [paymentProof, setPaymentProof] = useState(null);
  const [paymentProofPreview, setPaymentProofPreview] = useState(null);

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
const WHATSAPP_NUMBER = "+62 821-1838-3415";
const WHATSAPP_PHONE = "6282118383415";
const WHATSAPP_COMMUNITY_LINK =
"https://wa.me/6282118383415?text=Halo%20Stiqr%20Hub%2C%20saya%20ingin%20bergabung%20ke%20komunitas%20WA.";
const buildWhatsAppLink = (eventName = "") => {
  const safeName = eventName ? `${eventName} ` : "";
  const message = encodeURIComponent(
    `Halo, Saya tertarik dengan event ${safeName}STIQRHub bisa diskusi lebih lanjut?`
  );
  return `https://wa.me/${WHATSAPP_PHONE}?text=${message}`;
};
  const toNumber = (v) => {
    const n = typeof v === 'string' ? parseFloat(v) : v;
    return Number.isFinite(n) ? n : 0;
  };
  const fmt = (n) => {
    const num = Math.floor(toNumber(n));
    // Format dengan titik sebagai pemisah ribuan
    const formatted = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `Rp ${formatted}`;
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
  const eventWhatsAppLink = useMemo(() => buildWhatsAppLink(event?.name || ""), [event?.name]);
  const tenantProfile = useMemo(() => {
    if (typeof window === "undefined") return {};
    try {
      const stored = window.localStorage.getItem("user");
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }, []);
  const totalTenantCapacity = useMemo(() => {
    const boothCapacity = Number(event?.booth_capacity) || 0;
    const tenantPerBooth = Number(event?.tenant_capacity) || 0;
    if (boothCapacity > 0 && tenantPerBooth > 0) {
      return boothCapacity * tenantPerBooth;
    }
    return boothCapacity || tenantPerBooth || 0;
  }, [event?.booth_capacity, event?.tenant_capacity]);
  const registeredTenants =
    Number(event?.registrations_count ?? (Array.isArray(event?.registrations) ? event.registrations.length : 0)) || 0;
  const remainingTenantCapacity =
    totalTenantCapacity > 0 ? Math.max(totalTenantCapacity - registeredTenants, 0) : 0;
  const totalTenantCapacityLabel = totalTenantCapacity ? `${totalTenantCapacity} tenant` : "-";
  const remainingTenantCapacityLabel = totalTenantCapacity
    ? `${remainingTenantCapacity} tenant`
    : registeredTenants
    ? `${registeredTenants} tenant terdaftar`
    : "-";
  const registrationDateRangeLabel = useMemo(() => {
    if (isPerDay && startDate && endDate) {
      return `${formatDateIndonesia(startDate)} - ${formatDateIndonesia(endDate)}`;
    }
    if (!isPerDay) {
      return `${formatDateIndonesia(event?.start_date)} - ${formatDateIndonesia(event?.end_date)}`;
    }
    return "-";
  }, [endDate, event?.end_date, event?.start_date, isPerDay, startDate]);
  const qrisPreviewUrl = useMemo(() => {
    const qrData = `StiqrHub|Event:${event?.name || ""}|Tenant:${tenantProfile?.name || ""}|Total:${totalPreview}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(qrData)}`;
  }, [event?.name, tenantProfile?.name, totalPreview]);
  const effectivePaymentSummary = paymentSummary || {
    booth_price: boothSubtotal,
    platform_fee: platformFee,
    insurance_fee: insuranceFee,
    total: totalPreview,
  };
  const activePaymentMethod =
    dialogStep === "result"
      ? confirmedPaymentMethod || selectedPaymentMethod
      : selectedPaymentMethod;
  const paymentMethodLabel =
    activePaymentMethod === "qris"
      ? "QRIS"
      : activePaymentMethod === "bank_transfer"
      ? "Transfer Bank"
      : activePaymentMethod || "-";

  const checkEventConflict = async () => {
    try {
      // Get active events to check for conflicts
      const active = await apiGet(`${BACKEND_URL}/api/tenant/events/active`);
      const activeList = Array.isArray(active) ? active : active?.data || [];

      const selectedStart = isPerDay ? startDate : event?.start_date;
      const selectedEnd = isPerDay ? endDate : event?.end_date;

      if (!selectedStart || !selectedEnd) return false;

      const conflicts = activeList.filter((ev) => {
        if (String(ev.id) === String(id)) return false;
        const evStart = ev.start_date ? new Date(ev.start_date) : null;
        const evEnd = ev.end_date ? new Date(ev.end_date) : null;
        const selStart = new Date(selectedStart);
        const selEnd = new Date(selectedEnd);

        if (!evStart || !evEnd) return false;
        return (evStart <= selEnd && evEnd >= selStart);
      });

      if (conflicts.length > 0) {
        setConflictEvents(conflicts);
        setConflictWarningOpen(true);
        return true;
      }
      return false;
    } catch (e) {
      console.error("Error checking conflicts:", e);
      return false;
    }
  };

  const openRegisterConfirmation = async () => {
    if (!canRegister) return;

    // Check for conflicts first
    const hasConflict = await checkEventConflict();
    if (hasConflict) return;

    setRegistrationError("");
    setPaymentSummary(null);
    setDialogStep("review");
    setConfirmedPaymentMethod(null);
    setSelectedPaymentMethod("bank_transfer");
    setTermsAccepted(false);
    setPaymentProof(null);
    setPaymentProofPreview(null);
    setConfirmationOpen(true);
  };

  const closeRegisterConfirmation = () => {
    if (registering) return;
    setConfirmationOpen(false);
    setDialogStep("review");
    setPaymentSummary(null);
    setRegistrationError("");
    setTermsAccepted(false);
    setPaymentProof(null);
    setPaymentProofPreview(null);
  };

  const submitRegistration = async () => {
    if (!canRegister) return;
    if (selectedPaymentMethod === "bank_transfer" && !paymentProof) {
      setRegistrationError("Harap upload bukti transfer terlebih dahulu");
      return;
    }

    try {
      setRegistering(true);
      setRegistrationError("");
      setConfirmedPaymentMethod(selectedPaymentMethod);

      const body = isPerDay
        ? { start_date: startDate, end_date: endDate }
        : undefined;

      const res = await apiPost(
        `${BACKEND_URL}/api/tenant/events/${id}/register`,
        body
      );

      if (res?.status === "success") {
        setHasRegistered(true);
        setPaymentSummary(res?.data?.payment || null);

        // If bank transfer with proof, upload proof
        if (selectedPaymentMethod === "bank_transfer" && paymentProof && res?.data?.payment?.id) {
          try {
            const formData = new FormData();
            formData.append('payment_proof', paymentProof);
            await apiPost(`${BACKEND_URL}/api/tenant/payments/${res.data.payment.id}/proof`, formData, true);
          } catch (uploadError) {
            console.error("Error uploading proof:", uploadError);
            // Don't fail registration if proof upload fails
          }
        }

        setDialogStep("result");
      } else {
        setRegistrationError(res?.message || "Failed to register");
      }
    } catch (e) {
      console.error("Registration error:", e);
      const errorMsg = e?.response?.data?.message || e?.message || "Failed to register";
      setRegistrationError(errorMsg);
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

  const SectionCard = ({ title, subtitle, children, highlight, sx }) => (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: 2,
        border: "1px solid",
        borderColor: highlight ? "primary.light" : "grey.200",
        backgroundColor: highlight ? "primary.50" : "#fcfcfc",
        mb: 2,
        ...sx,
      }}
    >
      <Typography variant="subtitle1" fontWeight={700} color="text.primary" mb={subtitle ? 0.5 : 1}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body2" color="text.secondary" mb={1.5}>
          {subtitle}
        </Typography>
      )}
      {children}
    </Paper>
  );

  const InfoRow = ({ label, value, emphasize }) => (
    <Stack spacing={0.5}>
      <Typography variant="caption" color="text.secondary" textTransform="uppercase" letterSpacing={0.5} fontWeight={700}>
        {label}
      </Typography>
      {typeof value === "string" || typeof value === "number" ? (
        <Typography variant="body1" fontWeight={emphasize ? 700 : 500} color={emphasize ? "text.primary" : "text.secondary"}>
          {value}
        </Typography>
      ) : (
        value
      )}
    </Stack>
  );

  const eventDateRange = useMemo(() => {
    const parse = (date) => {
      if (!date) return null;
      const d = new Date(date);
      if (Number.isNaN(d.getTime())) return null;
      // Return YYYY-MM-DD
      return d.toISOString().split("T")[0];
    };
    return {
      start: parse(event?.start_date),
      end: parse(event?.end_date),
    };
  }, [event?.start_date, event?.end_date]);

  const clampDateToRange = (value) => {
    if (!value) return value;
    const { start, end } = eventDateRange;
    const val = new Date(value);
    if (Number.isNaN(val.getTime())) return value;
    if (start) {
      const min = new Date(start);
      if (val < min) return start;
    }
    if (end) {
      const max = new Date(end);
      if (val > max) return end;
    }
    return value;
  };

  useEffect(() => {
    if (!isPerDay) return;
    if (startDate) {
      setStartDate((prev) => {
        if (!prev) return prev;
        const clamped = clampDateToRange(prev);
        return clamped !== prev ? clamped : prev;
      });
    }
  }, [eventDateRange.start, eventDateRange.end, isPerDay]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isPerDay) return;
    if (endDate) {
      setEndDate((prev) => {
        if (!prev) return prev;
        let clamped = clampDateToRange(prev);
        if (startDate && clamped && new Date(clamped) < new Date(startDate)) {
          clamped = startDate;
        }
        return clamped !== prev ? clamped : prev;
      });
    }
  }, [eventDateRange.start, eventDateRange.end, startDate, isPerDay]); // eslint-disable-line react-hooks/exhaustive-deps

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

  const eventDescription =
    event?.details ||
    event?.description ||
    event?.short_description ||
    event?.detail ||
    "";

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

          <Typography variant="h4" mb={1}>
            {event.name}
          </Typography>
          {event.eo && event.eo.name && (
            <Typography variant="subtitle1" color="primary.main" fontWeight={600} mb={2}>
              <strong>Penyelenggara:</strong> {event.eo.name}
            </Typography>
          )}
          <Box display="flex" gap={1} mb={2} alignItems="center">
            <StatusChip value={event.status} />
            <Chip label={event.payment_method} variant="outlined" />
            {event.insurance_active && (
              <Chip label="Insurance Active" color="info" />
            )}
          </Box>
          <Grid container spacing={2} mb={3}>
            <Grid item xs={12} md={4}>
              <InfoRow label="Lokasi" value={event.location || "-"} emphasize />
            </Grid>
            <Grid item xs={12} md={4}>
              <InfoRow
                label="Periode Event"
                value={
                  <Stack spacing={0.3}>
                    <Typography variant="body1" fontWeight={700} color="text.primary">
                      <strong>Start:</strong> {formatDateIndonesia(event.start_date)}
                    </Typography>
                    <Typography variant="body1" fontWeight={700} color="text.primary">
                      <strong>End:</strong> {formatDateIndonesia(event.end_date)}
                    </Typography>
                  </Stack>
                }
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <InfoRow label="Kategori" value={event.category || "-"} emphasize />
            </Grid>
            <Grid item xs={12} md={4}>
              <InfoRow label="Total Kuota Tenant" value={totalTenantCapacityLabel} emphasize />
            </Grid>
            <Grid item xs={12} md={4}>
              <InfoRow label="Sisa Slot Tersedia" value={remainingTenantCapacityLabel} emphasize />
            </Grid>
          </Grid>

          <Box mb={3}>
            <SectionCard title={<strong>Detail Event</strong>} subtitle="Informasi dari EO mengenai event ini">
              {eventDescription ? (
                <Typography
                  variant="body2"
                  color="text.primary"
                  lineHeight={1.7}
                  sx={{ wordBreak: "break-word", whiteSpace: "pre-line" }}
                >
                  {eventDescription}
                </Typography>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Belum ada deskripsi yang dibagikan oleh EO.
                </Typography>
              )}
            </SectionCard>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <SectionCard title={<strong>Informasi Aturan Event</strong>} subtitle="Pastikan kamu mengikuti semua ketentuan EO">
                {Array.isArray(event.rules) && event.rules.length > 0 ? (
                  <Stack spacing={0.75}>
                    {event.rules.map((r, idx) => (
                      <Typography key={idx} variant="body2" color="text.primary">
                        • <strong>{r.rule_name}</strong>
                      </Typography>
                    ))}
                  </Stack>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Tidak ada aturan khusus untuk event ini.
                  </Typography>
                )}
              </SectionCard>

              {event.bank_accounts && event.bank_accounts.length > 0 && (
                <SectionCard
                  title={<strong>Rekening Pembayaran</strong>}
                  subtitle="Gunakan rekening berikut ketika dihubungi EO"
                >
                  <Stack spacing={1.5}>
                    {event.bank_accounts.map((account, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          p: 1.5,
                          borderRadius: 1.5,
                          border: "1px solid",
                          borderColor: account.is_default ? "primary.main" : "grey.300",
                          backgroundColor: account.is_default ? "primary.50" : "grey.50",
                        }}
                      >
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Typography variant="subtitle2">
                            {account.bank_name}
                          </Typography>
                          {account.is_default && (
                            <Chip label="Default" size="small" color="primary" />
                          )}
                        </Stack>
                        <Typography variant="body2" fontWeight={600}>
                          {account.account_number}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          a.n. {account.account_name}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </SectionCard>
              )}
            </Grid>

            <Grid item xs={12} md={6}>
              {event.contact_for_price ? (
                <SectionCard
                  title={<strong>Hubungi EO untuk Harga</strong>}
                  subtitle="Harga booth akan diinformasikan setelah kamu menghubungi EO"
                  highlight
                >
                  <Typography variant="body2" mb={2}>
                    Tekan tombol di bawah ini untuk terhubung langsung via WhatsApp dan mendiskusikan paket harga.
                  </Typography>
                  <Button
                    variant="contained"
                    color="success"
                    component="a"
                    href={eventWhatsAppLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Hubungi via WhatsApp
                  </Button>
                </SectionCard>
              ) : (
                <SectionCard title={<strong>Estimasi Biaya</strong>} subtitle="Simulasi biaya sebelum kamu daftar" highlight>
                  <Stack spacing={0.5}>
                    <Typography variant="body2">
                      Booth <strong>{isPerDay && selectedDays ? `( ${selectedDays} hari )` : ""}</strong>
                    </Typography>
                    <Typography variant="h6" color="text.primary" fontWeight={700} mb={1}>
                      {fmt(boothSubtotal)}
                    </Typography>
                    <Divider sx={{ my: 1.5 }} />
                    <Typography variant="body2">Platform Fee: <strong>{fmt(platformFee)}</strong></Typography>
                    <Typography variant="body2">Insurance: <strong>{fmt(insuranceFee)}</strong></Typography>
                    <Divider sx={{ my: 1.5 }} />
                    <Typography variant="subtitle1" fontWeight={800} color="primary.main">
                      Total Estimasi: {fmt(totalPreview)}
                    </Typography>
                  </Stack>
                </SectionCard>
              )}

              {isPerDay && !hasRegistered && (
                <SectionCard
                  title={<strong>Pilih Jadwal Booth</strong>}
                  subtitle="Tanggal harus berada dalam rentang event"
                >
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <TextField
                      label="Start Date"
                      type="date"
                      value={startDate}
                      onChange={(e) => {
                        const value = clampDateToRange(e.target.value);
                        setStartDate(value);
                        if (endDate && value && new Date(value) > new Date(endDate)) {
                          setEndDate(value);
                        }
                      }}
                      InputLabelProps={{ shrink: true }}
                      inputProps={{
                        min: eventDateRange.start || undefined,
                        max: eventDateRange.end || undefined,
                      }}
                      fullWidth
                    />
                    <TextField
                      label="End Date"
                      type="date"
                      value={endDate}
                      onChange={(e) => {
                        let value = clampDateToRange(e.target.value);
                        if (startDate && value && new Date(value) < new Date(startDate)) {
                          value = startDate;
                        }
                        setEndDate(value);
                      }}
                      InputLabelProps={{ shrink: true }}
                      inputProps={{
                        min: startDate || eventDateRange.start || undefined,
                        max: eventDateRange.end || undefined,
                      }}
                      fullWidth
                    />
                  </Stack>
                  <Typography variant="caption" color="text.secondary">
                    {formatDateIndonesia(event.start_date)} - {formatDateIndonesia(event.end_date)}
                  </Typography>
                </SectionCard>
              )}
            </Grid>
          </Grid>

          <SectionCard
            title={<strong>Action Center</strong>}
            subtitle={
              event.contact_for_price
                ? "Diskusikan langsung via WhatsApp untuk mendapatkan info harga"
                : hasRegistered
                  ? "Kamu sudah terdaftar di event ini"
                  : "Segera amankan slot kamu"
            }
          >
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              {event.contact_for_price ? (
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  component="a"
                  href={eventWhatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Hubungi via WhatsApp
                </Button>
              ) : !hasRegistered ? (
                <>
                <Button
                  variant="contained"
                  size="large"
                  onClick={openRegisterConfirmation}
                  disabled={registering || !canRegister}
                >
                  {registering ? "Registering..." : "Daftar Sekarang"}
                </Button>
                  {event.insurance_active && (
                    <Alert
                      severity="info"
                      sx={{
                        mt: 1.5,
                        width: '100%',
                        backgroundColor: 'info.main',
                        color: '#ffffff',
                        '& .MuiAlert-icon': {
                          color: '#ffffff',
                        },
                        '& .MuiAlert-message': {
                          color: '#ffffff',
                        }
                      }}
                    >
                      <Typography variant="body2" fontWeight={600} mb={0.5} sx={{ color: '#ffffff' }}>
                        Klaim Asuransi Tersedia untuk Event: <strong style={{ color: '#ffffff' }}>{event.name}</strong>
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#ffffff' }}>
                        Setelah mendaftar dan menyelesaikan pembayaran, kamu dapat mengajukan klaim asuransi jika terjadi kejadian yang tidak diinginkan.
                      </Typography>
                    </Alert>
                  )}
                </>
              ) : (
                <>
                <Button variant="contained" color="success" size="large" onClick={handleClaim}>
                  Ajukan Klaim
                </Button>
                  {event.insurance_active && (
                    <Alert
                      severity="info"
                      sx={{
                        mt: 1.5,
                        width: '100%',
                        backgroundColor: 'info.main',
                        color: '#ffffff',
                        '& .MuiAlert-icon': {
                          color: '#ffffff',
                        },
                        '& .MuiAlert-message': {
                          color: '#ffffff',
                        }
                      }}
                    >
                      <Typography variant="body2" fontWeight={600} sx={{ color: '#ffffff' }}>
                        Event: <strong style={{ color: '#ffffff' }}>{event.name}</strong> - Klaim Asuransi Tersedia
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 0.5, color: '#ffffff' }}>
                        Pastikan kamu sudah menyelesaikan pembayaran sebelum mengajukan klaim.
                      </Typography>
                    </Alert>
                  )}
                </>
              )}
              <Button variant="outlined" size="large" color="inherit" onClick={() => window.history.back()}>
                Kembali
              </Button>
            </Stack>
            {event.contact_for_price && (
              <Typography variant="caption" color="text.secondary" mt={1.5} display="block">
                Harga booth akan dikonfirmasi melalui WhatsApp setelah kamu menghubungi EO.
              </Typography>
            )}
          </SectionCard>

          <Divider sx={{ my: 4 }} />
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              border: "1px dashed",
              borderColor: "primary.light",
              backgroundColor: "primary.50",
            }}
          >
            <Typography variant="h6" mb={0.5}>
              Gabung WhatsApp Stiqr
            </Typography>
            <Typography variant="body2" color="textSecondary" mb={2}>
              Kalau butuh bantuan onboarding atau mau diskusi event, klik tombol
              di bawah untuk join grup WA resmi Stiqr.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                component="a"
                href={WHATSAPP_COMMUNITY_LINK}
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                color="success"
              >
                Buka WhatsApp
              </Button>
              <Box>
                <Typography variant="caption" color="textSecondary">
                  Nomor admin Stiqr
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {WHATSAPP_NUMBER}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </CardContent>
      </Card>

      {/* Conflict Warning Dialog */}
      <Dialog open={conflictWarningOpen} onClose={() => setConflictWarningOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <strong>Peringatan: Tabrakan Event</strong>
        </DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            <Typography variant="body2" fontWeight={600} mb={1}>
              Kamu sudah terdaftar di event lain pada tanggal yang sama!
            </Typography>
            <Typography variant="body2">
              Event yang bertabrakan:
            </Typography>
            <Stack spacing={1} sx={{ mt: 1 }}>
              {conflictEvents.map((ev) => (
                <Box key={ev.id} sx={{ p: 1.5, bgcolor: 'warning.50', borderRadius: 1 }}>
                  <Typography variant="body2" fontWeight={600}>
                    <strong>{ev.name}</strong>
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatDateIndonesia(ev.start_date)} - {formatDateIndonesia(ev.end_date)}
                  </Typography>
                </Box>
              ))}
            </Stack>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Kamu tidak dapat mendaftar ke event ini karena tanggalnya bertabrakan dengan event di atas.
            </Typography>
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConflictWarningOpen(false)}>Mengerti</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={confirmationOpen}
        onClose={closeRegisterConfirmation}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          <strong>
            {dialogStep === "review" ? "Detail Event & Informasi Pendaftaran" :
             dialogStep === "terms" ? "Syarat dan Ketentuan" :
             "Halaman Pembayaran"}
          </strong>
        </DialogTitle>
        <DialogContent dividers>
          {registrationError && (dialogStep === "review" || dialogStep === "terms" || dialogStep === "payment") && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {registrationError}
            </Alert>
          )}

          {dialogStep === "result" && (
            <>
            <Alert severity="success" sx={{ mb: 2 }}>
              Registrasi berhasil. Selesaikan pembayaran agar slot kamu dikunci.
              </Alert>
              {event?.insurance_active && (
                <Alert
                  severity="info"
                  sx={{
                    mb: 2,
                    backgroundColor: 'info.main',
                    color: '#ffffff',
                    '& .MuiAlert-icon': {
                      color: '#ffffff',
                    },
                    '& .MuiAlert-message': {
                      color: '#ffffff',
                    }
                  }}
                >
                  <Typography variant="body2" fontWeight={600} mb={0.5} sx={{ color: '#ffffff' }}>
                    Informasi Klaim Asuransi untuk Event: <strong style={{ color: '#ffffff' }}>{event?.name || 'Event ini'}</strong>
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#ffffff' }}>
                    Setelah pembayaran berhasil, kamu dapat mengajukan klaim asuransi jika terjadi kejadian yang tidak diinginkan selama event berlangsung.
                  </Typography>
            </Alert>
          )}
            </>
          )}

          {/* Step 1: Review - Detail Event, Harga, Peraturan */}
          {dialogStep === "review" && (
            <>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" fontWeight={700} mb={2}>
                  <strong>Informasi Event</strong>
                </Typography>
                <Grid container spacing={2} mb={2}>
                  <Grid item xs={12} md={6}>
                    <InfoRow label="Nama Event" value={event?.name || "-"} emphasize />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <InfoRow label="Lokasi" value={event?.location || "-"} emphasize />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <InfoRow label="Periode Event" value={registrationDateRangeLabel} emphasize />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <InfoRow label="Kategori" value={event?.category || "-"} emphasize />
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" fontWeight={700} mb={2}>
                  <strong>Rincian Biaya</strong>
                </Typography>
                <Stack spacing={0.75}>
                  <Typography variant="body2">
                    Booth: <strong>{fmt(boothSubtotal)}</strong>
                  </Typography>
                  <Typography variant="body2">
                    Platform Fee: <strong>{fmt(platformFee)}</strong>
                  </Typography>
                  <Typography variant="body2">
                    Insurance: <strong>{fmt(insuranceFee)}</strong>
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="subtitle1" fontWeight={800} color="primary.main">
                    Total: {fmt(totalPreview)}
                  </Typography>
                </Stack>
              </Box>

              {Array.isArray(event?.rules) && event.rules.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" fontWeight={700} mb={2}>
                    <strong>Peraturan Event</strong>
                  </Typography>
                  <Stack spacing={0.75}>
                    {event.rules.map((r, idx) => (
                      <Typography key={idx} variant="body2" color="text.primary">
                        • <strong>{r.rule_name}</strong>
                      </Typography>
                    ))}
                  </Stack>
                </Box>
              )}
            </>
          )}

          {/* Step 2: Terms - Checkbox Syarat dan Ketentuan */}
          {dialogStep === "terms" && (
            <Box>
              <Typography variant="h6" fontWeight={700} mb={2}>
                <strong>Syarat dan Ketentuan</strong>
              </Typography>
              <Box sx={{
                p: 2,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "grey.300",
                bgcolor: "grey.50",
                mb: 2,
                maxHeight: 300,
                overflow: "auto"
              }}>
                <Typography variant="body2" component="div" sx={{ whiteSpace: "pre-line" }}>
                  <strong>1. Pembayaran</strong><br />
                  • Pembayaran harus dilakukan sesuai dengan nominal yang tertera<br />
                  • Pembayaran melalui Transfer Bank atau QRIS<br />
                  • Bukti pembayaran harus diunggah setelah melakukan transfer<br />
                  <br />
                  <strong>2. Pembatalan</strong><br />
                  • Pembatalan dapat dilakukan sebelum event dimulai<br />
                  • Biaya yang sudah dibayar tidak dapat dikembalikan<br />
                  <br />
                  <strong>3. Kehadiran</strong><br />
                  • Tenant wajib hadir sesuai dengan jadwal yang telah ditentukan<br />
                  • Keterlambatan atau ketidakhadiran menjadi tanggung jawab tenant<br />
                  <br />
                  <strong>4. Asuransi</strong><br />
                  • Klaim asuransi dapat diajukan setelah pembayaran berhasil<br />
                  • Klaim harus diajukan sesuai dengan ketentuan yang berlaku<br />
                  <br />
                  <strong>5. Ketentuan Umum</strong><br />
                  • Tenant wajib mengikuti semua peraturan event yang telah ditetapkan oleh EO<br />
                  • Pelanggaran terhadap peraturan dapat mengakibatkan pembatalan partisipasi
                </Typography>
              </Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    required
                  />
                }
                label={
                  <Typography variant="body2">
                    Saya telah membaca dan menyetujui <strong>syarat dan ketentuan</strong> di atas
                  </Typography>
                }
              />
            </Box>
          )}

          {/* Step 3: Payment - Pilihan TF atau QRIS */}
          {dialogStep === "payment" && (
            <Box>
              <Typography variant="h6" fontWeight={700} mb={2}>
                <strong>Pilih Metode Pembayaran</strong>
              </Typography>

              <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
                <FormLabel component="legend">
                  <strong>Metode Pembayaran</strong>
                </FormLabel>
                <RadioGroup
                  row
                  value={selectedPaymentMethod}
                  onChange={(e) => {
                    setSelectedPaymentMethod(e.target.value);
                    setPaymentProof(null);
                    setPaymentProofPreview(null);
                  }}
                >
                  <FormControlLabel
                    value="bank_transfer"
                    control={<Radio />}
                    label={<strong>Transfer Bank</strong>}
                  />
                  <FormControlLabel
                    value="qris"
                    control={<Radio />}
                    label={<strong>QRIS</strong>}
                  />
                </RadioGroup>
              </FormControl>

              {selectedPaymentMethod === "bank_transfer" ? (
                <Box>
                  <Typography variant="subtitle2" fontWeight={700} mb={1}>
                    <strong>Rekening Pembayaran</strong>
                  </Typography>
                  {event?.bank_accounts?.length ? (
                    <Stack spacing={1.5} mb={3}>
                      {event.bank_accounts.map((account, idx) => (
                        <Box
                          key={`${account.account_number}-${idx}`}
                          sx={{
                            p: 1.5,
                            borderRadius: 1.5,
                            border: "1px solid",
                            borderColor: account.is_default ? "primary.main" : "grey.300",
                            backgroundColor: account.is_default ? "primary.50" : "grey.50",
                          }}
                        >
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="subtitle2" fontWeight={700}>
                              {account.bank_name}
                            </Typography>
                            {account.is_default && (
                              <Chip label="Utama" size="small" color="primary" />
                            )}
                          </Stack>
                          <Typography variant="body2" fontWeight={700}>
                            {account.account_number}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            a.n. {account.account_name}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  ) : (
                    <Typography variant="body2" color="text.secondary" mb={3}>
                      EO belum membagikan detail rekening di event ini.
                    </Typography>
                  )}

                  <Box>
                    <Typography variant="subtitle2" fontWeight={700} mb={1}>
                      <strong>Upload Bukti Transfer</strong>
                    </Typography>
                    <Button
                      variant="outlined"
                      component="label"
                      fullWidth
                      sx={{ mb: 1 }}
                    >
                      {paymentProof ? "Ganti File" : "Pilih File Bukti Transfer"}
                      <input
                        type="file"
                        hidden
                        accept="image/*,.pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setPaymentProof(file);
                            if (file.type.startsWith('image/')) {
                              setPaymentProofPreview(URL.createObjectURL(file));
                            } else {
                              setPaymentProofPreview(null);
                            }
                          }
                        }}
                      />
                    </Button>
                    {paymentProofPreview && (
                      <Box
                        component="img"
                        src={paymentProofPreview}
                        alt="Preview bukti transfer"
                        sx={{
                          width: '100%',
                          maxHeight: 200,
                          objectFit: 'contain',
                          borderRadius: 1,
                          border: '1px solid #ddd',
                          mt: 1
                        }}
                      />
                    )}
                    {paymentProof && !paymentProofPreview && (
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        File terpilih: {paymentProof.name}
                      </Typography>
                    )}
                  </Box>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    Scan QRIS berikut dan pastikan nominal transfer sama dengan total tagihan.
                  </Typography>
                  <Box
                    component="img"
                    src={qrisPreviewUrl}
                    alt="Kode QRIS StiqrHub"
                    sx={{
                      width: 280,
                      height: 280,
                      borderRadius: 2,
                      border: "1px solid",
                      borderColor: "grey.200",
                      backgroundColor: "#fff",
                      objectFit: "contain",
                    }}
                  />
                  <Typography variant="subtitle2" fontWeight={700}>
                    Total yang harus dibayar: {fmt(effectivePaymentSummary.total)}
                  </Typography>
                </Box>
              )}
            </Box>
          )}

          <Box
            sx={{
              mb: 3,
              p: 2,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "grey.200",
            }}
          >
            <Typography variant="subtitle2" color="text.secondary" fontWeight={700} mb={1}>
              Detail Registrasi
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <InfoRow label="Nama Tenant" value={tenantProfile?.name || "-"} />
              </Grid>
              <Grid item xs={12} md={6}>
                <InfoRow label="Email" value={tenantProfile?.email || "-"} />
              </Grid>
              <Grid item xs={12} md={6}>
                <InfoRow label="Event" value={event?.name || "-"} emphasize />
              </Grid>
              <Grid item xs={12} md={6}>
                <InfoRow label="Periode Registrasi" value={registrationDateRangeLabel} />
              </Grid>
              {isPerDay && (
                <Grid item xs={12} md={6}>
                  <InfoRow
                    label="Jumlah Hari"
                    value={selectedDays ? `${selectedDays} hari` : "-"}
                  />
                </Grid>
              )}
              <Grid item xs={12} md={6}>
                <InfoRow
                  label="Metode Pembayaran"
                  value={paymentMethodLabel}
                />
              </Grid>
            </Grid>
          </Box>

          <Box
            sx={{
              mb: 3,
              p: 2,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "grey.200",
            }}
          >
            <Typography variant="subtitle2" color="text.secondary" fontWeight={700} mb={1}>
              Rincian Biaya
            </Typography>
            <Stack spacing={0.75}>
              <Typography variant="body2">
                Booth: <strong>{fmt(effectivePaymentSummary.booth_price)}</strong>
              </Typography>
              <Typography variant="body2">
                Platform Fee: <strong>{fmt(effectivePaymentSummary.platform_fee)}</strong>
              </Typography>
              <Typography variant="body2">
                Insurance: <strong>{fmt(effectivePaymentSummary.insurance_fee)}</strong>
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="subtitle1" fontWeight={800} color="primary.main">
                Total: {fmt(effectivePaymentSummary.total)}
              </Typography>
            </Stack>
          </Box>

          {dialogStep === "review" ? (
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "grey.200",
              }}
            >
              <Alert
                severity="info"
                sx={{
                  mb: 2,
                  backgroundColor: 'info.main',
                  color: '#ffffff',
                  '& .MuiAlert-icon': {
                    color: '#ffffff',
                  },
                  '& .MuiAlert-message': {
                    color: '#ffffff',
                  }
                }}
              >
                <Typography variant="body2" fontWeight={600} mb={0.5} sx={{ color: '#ffffff' }}>
                  Informasi Penting
                </Typography>
                <Typography variant="body2" sx={{ color: '#ffffff' }}>
                  Setelah mendaftar, kamu harus menyelesaikan pembayaran terlebih dahulu sebelum dapat mengajukan klaim asuransi. Pastikan nominal pembayaran sesuai dengan total yang tertera.
                </Typography>
              </Alert>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">Pilih Metode Pembayaran</FormLabel>
                <RadioGroup
                  row
                  value={selectedPaymentMethod}
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                >
                  <FormControlLabel
                    value="bank_transfer"
                    control={<Radio />}
                    label="Transfer Bank"
                  />
                  <FormControlLabel value="qris" control={<Radio />} label="QRIS" />
                </RadioGroup>
              </FormControl>
              {selectedPaymentMethod === "bank_transfer" ? (
                <Box mt={2}>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    Gunakan salah satu rekening EO berikut untuk transfer manual.
                  </Typography>
                  {event?.bank_accounts?.length ? (
                    <Stack spacing={1.5}>
                      {event.bank_accounts.map((account, idx) => (
                        <Box
                          key={`${account.account_number}-${idx}`}
                          sx={{
                            p: 1.5,
                            borderRadius: 1.5,
                            border: "1px solid",
                            borderColor: account.is_default ? "primary.main" : "grey.300",
                            backgroundColor: account.is_default ? "primary.50" : "grey.50",
                          }}
                        >
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="subtitle2">
                              {account.bank_name}
                            </Typography>
                            {account.is_default && (
                              <Chip label="Utama" size="small" color="primary" />
                            )}
                          </Stack>
                          <Typography variant="body2" fontWeight={700}>
                            {account.account_number}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            a.n. {account.account_name}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      EO belum membagikan detail rekening di event ini.
                    </Typography>
                  )}
                </Box>
              ) : (
                <Box
                  mt={2}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Scan QRIS berikut dan pastikan nominal transfer sama dengan total tagihan.
                  </Typography>
                  <Box
                    component="img"
                    src={qrisPreviewUrl}
                    alt="Kode QRIS StiqrHub"
                    sx={{
                      width: 220,
                      height: 220,
                      borderRadius: 2,
                      border: "1px solid",
                      borderColor: "grey.200",
                      backgroundColor: "#fff",
                      objectFit: "contain",
                    }}
                  />
                  <Typography variant="subtitle2">
                    Total yang harus dibayar: {fmt(effectivePaymentSummary.total)}
                  </Typography>
                </Box>
              )}
            </Box>
          ) : (
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "grey.200",
                backgroundColor: "grey.50",
              }}
            >
              <Typography variant="subtitle2" color="text.secondary" fontWeight={700} mb={1}>
                Instruksi Pembayaran ({paymentMethodLabel})
              </Typography>
              {activePaymentMethod === "bank_transfer" ? (
                <>
                  <Typography variant="body2" mb={1}>
                    Transfer sesuai nominal ke salah satu rekening di bawah, lalu unggah bukti bayar saat diminta EO.
                  </Typography>
                  {event?.bank_accounts?.length ? (
                    <Stack spacing={1}>
                      {event.bank_accounts.map((account, idx) => (
                        <Typography key={`${account.account_number}-${idx}`} variant="body2">
                          {account.bank_name} - {account.account_number} ({account.account_name})
                        </Typography>
                      ))}
                    </Stack>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      EO belum menambahkan rekening. Hubungi EO untuk konfirmasi pembayaran.
                    </Typography>
                  )}
                </>
              ) : (
                <>
                  <Typography variant="body2" mb={1}>
                    Scan QRIS di bawah menggunakan aplikasi pembayaran favoritmu.
                  </Typography>
                  <Box
                    component="img"
                    src={qrisPreviewUrl}
                    alt="QRIS Pembayaran"
                    sx={{
                      width: 220,
                      height: 220,
                      borderRadius: 2,
                      border: "1px solid",
                      borderColor: "grey.200",
                      backgroundColor: "#fff",
                      objectFit: "contain",
                      display: "block",
                      mx: "auto",
                    }}
                  />
                  <Typography variant="subtitle2" align="center" mt={1}>
                    Nominal: {fmt(effectivePaymentSummary.total)}
                  </Typography>
                </>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          {dialogStep === "review" ? (
            <>
              <Button onClick={closeRegisterConfirmation} disabled={registering}>
                Batal
              </Button>
              <Button
                variant="contained"
                onClick={() => setDialogStep("terms")}
                disabled={registering}
              >
                Lanjutkan
              </Button>
            </>
          ) : dialogStep === "terms" ? (
            <>
              <Button onClick={() => setDialogStep("review")} disabled={registering}>
                Kembali
              </Button>
              <Button
                variant="contained"
                onClick={() => setDialogStep("payment")}
                disabled={registering || !termsAccepted}
              >
                Setuju & Lanjutkan
              </Button>
            </>
          ) : dialogStep === "payment" ? (
            <>
              <Button onClick={() => setDialogStep("terms")} disabled={registering}>
                Kembali
              </Button>
              <Button
                variant="contained"
                onClick={submitRegistration}
                disabled={registering || (selectedPaymentMethod === "bank_transfer" && !paymentProof)}
              >
                {registering ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Konfirmasi & Daftar"
                )}
              </Button>
            </>
          ) : (
            <Button variant="contained" onClick={closeRegisterConfirmation}>
              Selesai
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
}
